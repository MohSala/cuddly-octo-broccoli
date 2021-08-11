import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import './Register.css';

function Register(props) {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const registerTo = () => {

    }

    return (
        <div className="Register">
            <h4>Register</h4>

            <form>
                <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <select onChange={e => setRole(e.target.value)}>
                    <option value="jobseeker">Job Seeker</option>
                    <option value="company">Company</option>
                </select>

                <button onClick={registerTo}>Submit</button>
            </form>
            <p>Already a member? <span className="Register__login" onClick={() => { props.history.push("/login") }}>Sign In </span></p>
        </div>
    )
}


export default Register
