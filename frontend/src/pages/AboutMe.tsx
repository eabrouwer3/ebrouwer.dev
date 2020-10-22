import * as React from "react";
import {Col, Row} from "../styles/grid";

const AboutMe: React.FC = () => {
    return (
        <>
            <Row>
                <Col style={{textAlign: 'center'}}>
                    <h1>Ethan Brouwer</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{height: '100vh'}}>
                        &nbsp;
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AboutMe;