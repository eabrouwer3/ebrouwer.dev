import React from 'react';
import styled from 'styled-components';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import BYUCovid from "./pages/BYUCovid";
import {Row, Column} from "./styles/grid";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
    return (
        <Router>
            <Container>
                <Row style={{textAlign: 'center'}}>
                    <Column>
                        <Link to={'/'}>Home</Link>
                    </Column>
                    <Column>
                        <Link to={'/byu-covid'}>BYU COVID-19</Link>
                    </Column>
                </Row>
                <Row>
                    <Switch>
                        <Route path={'/byu-covid'}><BYUCovid/></Route>
                        <Route path={'/'}>
                            <Column style={{textAlign: 'center'}}>
                                <h1>Ethan Brouwer</h1>
                            </Column>
                        </Route>
                    </Switch>
                </Row>
            </Container>
        </Router>
    );
}

export default App;
