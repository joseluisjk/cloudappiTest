import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './pages/dashboard';
import Details from './pages/details';
import Create from './pages/create';
import './App.scss';

function App() {
  return (
    <div className="main_container">
      <Router>
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
