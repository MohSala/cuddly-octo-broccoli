import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddVacancy from './components/Vacancy/AddVacancy';
import JobDetail from './components/Dashboard/JobDetail';
import { LikedPosts } from './app/context'


function App() {
  const [likedPosts, setLikedPosts] = useState([]);

  return (
    <div className="app">

      <LikedPosts.Provider value={{ likedPosts, setLikedPosts }}>

        <Router>
          <Switch>
            {/* <Route exact path="/" component={Home} render={() => (
            <Redirect to="/dashboard" />
          )} /> */}
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/add-vacancy' component={AddVacancy} />

          </Switch>
        </Router>
      </LikedPosts.Provider>
    </div>
  );
}

export default App;
