import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './pages/login/login';
import Magic from './pages/magic/magic';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Login}></Route>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/magic' component={Magic}></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
