import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import AboutMe from "./pages/AboutMe";
import './styles/App.scss';
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={'/'} exact={true}><AboutMe/></Route>
                {/*<Route path={'/byu-covid'} exact={true}><BYUCovid/></Route>*/}
            </Switch>
        </Router>
    );
}

export default App;
