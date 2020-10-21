import * as React from "react";
import {useEffect, useState} from "react";
import {API} from "../utils";
import * as D from 'date-fns';
import * as d3 from 'd3';
import {Col, Row} from "../styles/grid";
import BarChart from "../components/charts/BarChart";
import LineByDateChart from "../components/charts/LineByDateChart";
import PlayChart from "../components/charts/PlayChart";

interface CaseCount {
    date: string,
    caseCount: number
}

const BYUCovid: React.FC = () => {
    const [totalCases, setTotalCases] = useState<CaseCount[]>([]);

    useEffect(() => {
        API.get(`byu-covid/totals`).then(({data}) => setTotalCases(data));
    }, []);

    console.log(totalCases);

    return (
        <>
            <Row>
                <Col style={{width: '300px', justifyContent: 'center'}}>
                    <table>
                        <tr>
                            <td>Date</td>
                            <td>Case Count</td>
                        </tr>
                        {totalCases
                            .sort(({date: dateA}, {date: dateB}) => D.compareAsc(new Date(dateA), new Date(dateB)))
                            .map(({date, caseCount}, i) => (
                                    <tr>
                                        <td>{date}</td>
                                        <td>{caseCount}</td>
                                    </tr>
                                )
                            )}
                    </table>
                </Col>
                <Col>
                    <BarChart data={totalCases.map(({date, caseCount}) => ({label: date, value: caseCount}))}/>
                </Col>
            </Row>
            <Row>
                {/*<Column>*/}
                {/*    <LineByDateChart data={totalCases.map(({date, caseCount}) => ({date: new Date(date), value: caseCount}))}/>*/}
                {/*</Column>*/}
                <Col>
                    <PlayChart/>
                </Col>
            </Row>
        </>
    );
};

export default BYUCovid;