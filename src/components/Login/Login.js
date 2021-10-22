import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import './Login.css';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

function Login(props) {
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();


    const loginTo = (e) => {
        setLoading(true);
        e.preventDefault();
        if (!username || !password) {
            alert("Username and Password are both required")
            setLoading(false);
        }
        else {
            setLoading(true);
            axios.post(`${BASE_URL}api/auth/signin`, {
                usernameOrEmail: username,
                password
            }, {})
                .then((response) => {
                    console.log("RESP>> ", response.data)
                    localStorage.setItem("token", response.data.accessToken);
                    let userr = response.data.user;
                    userr.role = userr.authorities[0].authority;
                    localStorage.setItem("user", JSON.stringify(userr));
                    setError(false);
                    dispatch(login(response.data.user))
                    if(userr.role == "ROLE_JOBSEEKER"){
                        axios.post(`${BASE_URL}api/ca/job-seeker`, {
                            "bio":"My Bio",
                            "currentPosition":"Software Engineer"
                        }, {
                            "headers":{
                                'Authorization': `Bearer ${response.data.accessToken}`,
                                'Access-Control-Allow-Origin': '*',
                            }
                        }).then((response) => {
                            localStorage.setItem("jobseeker", JSON.stringify(response.data));
                            setLoading(false);
                            props.history.push("/dashboard");
                        });
                    }else{
                        axios.post(`${BASE_URL}api/js/company`, {
                            "userId":userr.id,
                            "street":"BroadWay",
                            "city":"Fairfield",
                            "state":"IA",
                            "zipcode":"52556"
                        }, {
                            "headers":{
                                'Authorization': `Bearer ${response.data.accessToken}`,
                                'Access-Control-Allow-Origin': '*',
                            }
                        }).then((response) => {
                            localStorage.setItem("company", JSON.stringify(response.data));
                            setLoading(false);
                            props.history.push("/dashboard");
                        });
                    }
                })
                .catch((e) => {
                    setError(true);
                    setErrorMsg("Invalid Credentials");
                    console.log("ERROR", e.message)
                })
            setLoading(false);
        }
    }

    return (
        <div className="Login">
            <h1>MIU Job Portal</h1>
            <h4>Login</h4>
            {
                error &&
                <p className="errorText">{errorMsg}</p>
            }
            {
                isLoading &&
                <h3>Loading...</h3>
            }
            <form>
                <input type="text" placeholder="Username or Email" required={true} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={loginTo}>
                    Sign In
                </button>
            </form>
            <p>Not a member? <span className="Login__register" onClick={() => { props.history.push("/register") }}>Register Now </span></p>
        </div>
    )
}

export default Login
