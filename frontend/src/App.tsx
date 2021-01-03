import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import AboutMe from "./pages/AboutMe";
import './styles/App.scss';
import Header from "./components/Header";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import ContactMe from "./pages/ContactMe";
import Footer from "./components/Footer";
import PDF from "./pages/portfolio/PDF";

// @ts-ignore
import trafficPDF from './documents/traffic.pdf';
// @ts-ignore
import climbingPDF from './documents/climbing.pdf';

function App() {
    return (
        <Router>
            <Header/>
            <div style={{minHeight: '100vh'}}>
                <Switch>
                    <Route path={'/'} exact={true}><AboutMe/></Route>
                    <Route path={'/resume'} exact={true}><Resume/></Route>
                    <Route path={'/portfolio'} exact={true}><Portfolio/></Route>
                    <Route path={'/portfolio/traffic'} exact={true}><PDF title={'Modeling Traffic Flow'} document={trafficPDF}/></Route>
                    <Route path={'/portfolio/climbing'} exact={true}><PDF title={'Predicting Climbing Champions'} document={climbingPDF}/></Route>
                    <Route path={'/contact'} exact={true}><ContactMe/></Route>
                    {/*<Route path={'/byu-covid'} exact={true}><BYUCovid/></Route>*/}
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
