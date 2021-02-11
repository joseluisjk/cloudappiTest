import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';

import Dashboard from './pages/dashboard';
import './App.scss';

function App() {
  return (
    <Container fluid className="main_container">
      <Router>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
