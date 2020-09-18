import requests
from bs4 import BeautifulSoup
import re
import datetime
from itertools import accumulate
from toolz.curried import assoc
import os
from decimal import Decimal
import boto3
from dateutil import parser
DDB = boto3.client('dynamodb')

TOTAL_TABLE = os.environ.get('TOTAL_TABLE')
AVERAGE_TABLE = os.environ.get('AVERAGE_TABLE')
SIR_TABLE = os.environ.get('SIR_TABLE')


def get_soup():
    resp = requests.get('https://www.byu.edu/coronavirus/covid-19-screening')
    return BeautifulSoup(resp.text, 'html.parser')


def get_total_pop(soup):
    str_re = re.compile(r'There are ([0-9,]+) people in the campus community this fall semester\.')
    text = str(soup.find(string=str_re))
    count = int(re.search(str_re, text).group(1).replace(',', ''))
    return count


def get_IR(soup):
    table = soup.find_all(name='table')[0]
    def get_data(row):
        cols = row.find_all('td')
        percent = str(cols[2].string or '').replace('%', '') or None
        return {
            'count': int(cols[1].string),
            'percent': percent and str(Decimal(percent) / 100)
        }
    rows = table.find_all(name='tr')[1:3]
    data = tuple(map(get_data, rows))
    return data
    

def get_IR_date(soup):
    str_re = re.compile(r'as of (.*)\)')
    text = str(soup.find(string=str_re))
    date_str = re.search(str_re, text).group(1)
    return parser.parse(date_str).date().isoformat()


def parse_weekly_table(soup):
    table = soup.find_all(name='table')[2]
    rows = table.find_all(name='tr')[1:]
    def get_data(row):
        cols = row.find_all('td')
        date = re.search(r'[0-9]+/[0-9]+–([0-9]+)/([0-9]+)', str(cols[0].string))
        year = datetime.datetime.now().year
        month = int(date.group(1))
        day = int(date.group(2))
        average = Decimal(cols[1].string) / 100
        total = int(cols[2].string)
        return {
            'date': f'{year}-{month:02}-{day:02}',
            'average': str(average),
            'total': total
        }
    data = list(map(get_data, rows))
    return data


def handler(event=None, context=None, callback=None):
    soup = get_soup()
    total_pop = get_total_pop(soup)
    print(total_pop)
    I, R = get_IR(soup)
    IR_date = get_IR_date(soup)
    S_count = total_pop - I['count'] - R['count']
    S = {
        'count': S_count,
        'percent': S_count / total_pop
    }
    print(I, R)
    
    weekly = parse_weekly_table(soup)
    print(weekly)
    
    accumulated = list(accumulate(weekly, lambda a, b: assoc(b, 'total', b['total'] + a['total'])))
    print(accumulated)

    # Save Totals
    for row in accumulated:
        DDB.put_item(
            TableName=TOTAL_TABLE,
            Item={
                "caseCount": {
                    "N": str(row['total'])
                },
                "date": {
                    "S": row['date']
                }
            }
        )
    DDB.put_item(
        TableName=TOTAL_TABLE,
        Item={
            "caseCount": {
                "N": str(I['count'] + R['count'])
            },
            "date": {
                "S": IR_date
            }
        }
    )

    # Save Averages
    for row in accumulated:
        DDB.put_item(
            TableName=AVERAGE_TABLE,
            Item={
                "average": {
                    "N": row['average']
                },
                "date": {
                    "S": row['date']
                }
            }
        )

    # Save SIR
    DDB.put_item(
        TableName=SIR_TABLE,
        Item={
            "date": {
                "S": IR_date
            },
            "susceptibleCount": {
                "N": str(S['count'])
            },
            "susceptiblePercent": {
                "N": str(S['percent'])
            },
            "infectedCount": {
                "N": str(I['count'])
            },
            "infectedPercent": {
                "N": str(I['percent'] or I['count']/total_pop)
            },
            "recoveredCount": {
                "N": str(R['count'])
            },
            "recoveredPercent": {
                "N": str(R['percent'] or R['count']/total_pop)
            }
        }
    )
