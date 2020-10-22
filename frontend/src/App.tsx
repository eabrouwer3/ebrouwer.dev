import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import AboutMe from "./pages/AboutMe";
import './styles/App.scss';
import Header from "./components/Header";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import ContactMe from "./pages/ContactMe";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={'/'} exact={true}><AboutMe/></Route>
                <Route path={'/resume'} exact={true}><Resume/></Route>
                <Route path={'/portfolio'} exact={true}><Portfolio/></Route>
                <Route path={'/contact'} exact={true}><ContactMe/></Route>
                {/*<Route path={'/byu-covid'} exact={true}><BYUCovid/></Route>*/}
            </Switch>
        </Router>
    );
}

export default App;
