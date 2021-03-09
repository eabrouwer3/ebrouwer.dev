import * as React from "react";
import {useEffect, useState} from "react";
import { Row, Col } from "../styles/grid";
import * as D from 'date-fns';
import styled from "styled-components";

const TimeBox = styled(Col)`
  flex-grow: 4;
  ${Row} {
    justify-content: center;
    span {
      color: white;
      font-size: 3rem;
      padding-bottom: 1rem;
      padding-top: 0;
      &.header {
        padding: 1rem 0;
        font-size: 10rem;
      }
    }
  }
`;

const Colon = styled(Col)`
  flex-grow: 1;
  ${Row} {
    justify-content: center;
    color: white;
    font-size: 10rem;
    padding-top: 1rem;
    padding-bottom: 5rem;
  }
`;

const endOfCountdown = new Date('2021-04-21T23:59:59');

const ACMECountdown: React.FC = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        document.body.style.background = '#027FFE';
        return () => {
            document.body.style.background = '';
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const days = D.differenceInDays(endOfCountdown, now);
    const hours = D.differenceInHours(endOfCountdown, D.addDays(now, days));
    const minutes = D.differenceInMinutes(endOfCountdown, D.addHours(D.addDays(now, days), hours));
    const seconds = D.differenceInSeconds(endOfCountdown, D.addMinutes(D.addHours(D.addDays(now, days), hours), minutes));

    return (
        <>
            <Row style={{justifyContent: 'center'}}>
                <h1 className='header' style={{color: 'white', fontSize: '6rem'}}>ACME IS DONE IN</h1>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <Row style={{width: '80%', background: '#444444', justifyContent: 'center', borderRadius: '20px'}}>
                    <TimeBox>
                        <Row>
                            <span className='header'>{days}</span>
                        </Row>
                        <Row>
                            <span>days</span>
                        </Row>
                    </TimeBox>
                    <Colon><Row>:</Row></Colon>
                    <TimeBox>
                        <Row>
                            <span className='header'>{hours.toString().padStart(2, '0')}</span>
                        </Row>
                        <Row>
                            <span>hours</span>
                        </Row>
                    </TimeBox>
                    <Colon><Row>:</Row></Colon>
                    <TimeBox>
                        <Row>
                            <span className='header'>{minutes.toString().padStart(2, '0')}</span>
                        </Row>
                        <Row>
                            <span>minutes</span>
                        </Row>
                    </TimeBox>
                    <Colon><Row>:</Row></Colon>
                    <TimeBox>
                        <Row>
                            <span className='header'>{seconds.toString().padStart(2, '0')}</span>
                        </Row>
                        <Row>
                            <span>seconds</span>
                        </Row>
                    </TimeBox>
                </Row>
            </Row>
            <Row style={{justifyContent: 'center'}}>
                <h1 className='header' style={{color: 'white', fontSize: '3rem'}}>On {D.format(endOfCountdown, 'MMMM d, yyyy')}</h1>
            </Row>
        </>
    );
};

export default ACMECountdown;