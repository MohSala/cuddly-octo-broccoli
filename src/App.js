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
import Applications from './components/Applications/Applications';
import ApplicationDetail from './components/Applications/ApplicationDetail';
import PendingVacancies from './components/PendingVacancies/PendingVacancies';
import AddSkill from './components/JobSeekerProfile/AddSkill';
import JobSeekerProfile from './components/JobSeekerProfile/JobSeekerProfile';
import AddExperience from './components/JobSeekerProfile/AddExperience';
import AddCertificate from './components/JobSeekerProfile/AddCertificate';


function App(props) {
  const [likedPosts, setLikedPosts] = useState([]);
  const user = useSelector(selectUser);
  console.log("uuu", user);
  return (
    <div className="app">

      <LikedPosts.Provider value={{ likedPosts, setLikedPosts }}>

        <Router>
          <Switch>
            {/* <Route exact path="/" component={Home} render={() => (
            <Redirect to="/dashboard" />
          )} /> */}
            {
              !user ?
                <Route exact path="/" component={Login} render={() => (
                  <Redirect to="/login" />
                )} />

                : <Route exact path="/" render={() => (
                  <Redirect to="/dashboard" />
                )} />

            }
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/add-vacancy' component={AddVacancy} />
            <Route path='/our-vacancy' component={OurVacancy} />
            <Route path='/applications' component={Applications} />
            <Route exact path='/application/:id' component={ApplicationDetail} />
            <Route path='/pending-vacancy' component={PendingVacancies} />
            <Route path='/add-skill' component={AddSkill} />
            <Route path='/experience' component={JobSeekerProfile} />
            <Route path='/add-experience' component={AddExperience} />
            <Route path='/add-certificate' component={AddCertificate} />
          </Switch>
        </Router>
      </LikedPosts.Provider>
    </div>
  );
}

export default App;
