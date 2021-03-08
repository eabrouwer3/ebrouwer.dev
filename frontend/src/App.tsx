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
import SlideDeck from "./pages/portfolio/SlideDeck";

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
                    <Route path={'/portfolio/blockchain'} exact={true}><SlideDeck title={'Blockchain Slide Deck'} url={'https://slides.com/ethanbrouwer/blockchain'}/></Route>
                    <Route path={'/portfolio/react-useeffect'} exact={true}><SlideDeck title={'React `useEffect()` Slide Deck'} url={'https://slides.com/ethanbrouwer/react-useeffect'}/></Route>
                    <Route path={'/contact'} exact={true}><ContactMe/></Route>
                    <Route path={'/acme-countdown'} exact={true}>
                        <div style={{display: 'flex', width: '100%', justifyContent: "center"}}>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <h1 style={{textAlign: 'center'}}>ACME Countdown</h1>
                                <iframe width="300" height="154" src="https://w2.countingdownto.com/3492499"
                                      frameBorder="0"/>
                            </div>
                        </div>
                    </Route>
                    {/*<Route path={'/byu-covid'} exact={true}><BYUCovid/></Route>*/}
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
}

export default App;
