import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { selectUser, logout, login } from './features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AddVacancy from './components/Vacancy/AddVacancy';
import JobDetail from './components/Dashboard/JobDetail';
import { LikedPosts } from './app/context'
import OurVacancy from './components/OurVacancy/OurVacancy';


function App(props) {
  const [likedPosts, setLikedPosts] = useState([]);
  const user = useSelector(selectUser);
  return (
    <div className="app">

      <LikedPosts.Provider value={{ likedPosts, setLikedPosts }}>

        <Router>
          <Switch>
            {/* <Route exact path="/" component={Home} render={() => (
            <Redirect to="/dashboard" />
          )} /> */}
            {
              !user &&
              <Route exact path="/" component={Login} render={() => (
                <Redirect to="/login" />
              )} />
            }
            <Route exact path="/" component={Login} render={() => (
              <Redirect to="/login" />
            )} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/add-vacancy' component={AddVacancy} />
            <Route path='/our-vacancy' component={OurVacancy} />
          </Switch>
        </Router>
      </LikedPosts.Provider>
    </div>
  );
}

export default App;
