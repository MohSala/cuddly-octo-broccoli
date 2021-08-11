import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import './Register.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register(props) {
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("jobseeker");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const notify = () => toast.success("Registration Successful!");

    const registerTo = (e) => {
        setLoading(true);
        e.preventDefault();
        if (!username || !password || !name || !role || !email) {
            alert("All fields are required")
            setLoading(false);
        }
        else {
            setLoading(true);
            axios.post(`${BASE_URL}api/auth/signup`, {
                name,
                username,
                email,
                password,
                role
            }, {})
                .then((response) => {
                    console.log("RESP>> ", response.data)
                    setLoading(false);
                    setError(false);
                    notify();
                    setTimeout(() => {
                        props.history.push("/login");
                    }, 3000);
                })
                .catch((e) => {
                    setError(true);
                    setErrorMsg(e.response.data.message);
                    console.log("ERROR", e.response.data.message)
                })
            setLoading(false);
        }
    }

    return (
        <div className="Register">
            <h4>Register</h4>
            {
                error &&
                <p className="errorText">{errorMsg}</p>
            }
            {
                isLoading &&
                <p>Loading...</p>
            }
            <ToastContainer />
            <form>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <select onChange={e => setRole(e.target.value)}>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="company">Company</option>
                </select>

                <button onClick={registerTo}>{isLoading ? 'Loading...' : 'Submit'}</button>
            </form>
            <p>Already a member? <span className="Register__login" onClick={() => { props.history.push("/login") }}>Sign In </span></p>
        </div>
    )
}


export default Register
