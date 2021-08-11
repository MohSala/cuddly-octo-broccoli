import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import './Login.css';
import axios from "axios";

function Login(props) {
    // api/auth/signin
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const loginTo = (e) => {
        setLoading(true);
        e.preventDefault();

        if (!username || !password) {
            alert("Username and Password are both required")
            setLoading(false);
        }
        else {
            axios.post(`${BASE_URL}api/auth/signin`, {
                usernameOrEmail: username,
                password
            }, {})
                .then((response) => {
                    console.log("RESP>> ", response.data)
                    localStorage.setItem("token", response.data.accessToken);
                    setLoading(false);
                    setError(false);
                    props.history.push("/dashboard");
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
            <h4>Login</h4>
            {
                error &&
                <p className="errorText">{errorMsg}</p>
            }
            <form>
                <input type="text" placeholder="Username or Email" required={true} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={loginTo}>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <p>Not a member? <span className="Login__register" onClick={() => { props.history.push("/register") }}>Register Now </span></p>
        </div>
    )
}

export default Login
