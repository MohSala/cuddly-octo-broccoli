import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import axios from "axios";
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSkill(props) {
    const [skill, setSkill] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const notify = () => toast.success("Skill Successfully added");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }

    const submitAction = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${BASE_URL}api/skills/`, {
            name: skill
        }, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setLoading(false);
                setError(false);
                notify();
            })
            .catch((e) => {
                setError(true);
                setErrorMsg(e.message);
                console.log("ERROR", e.message)
            })
        setLoading(false);
    }


    return (
        <>
            <Header />
            <button className="goBack" onClick={() => props.history.goBack()}>Go Back</button>
            <div className="AddVacancy">

                <h3>Add A Skill</h3>
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
                    <input type="text" placeholder="Skill e.g NodeJS" required onChange={(t) => setSkill(t.target.value)} />

                    <button type="submit" onClick={submitAction}>Add Skill</button>
                </form>
            </div>
        </>
    )
}

export default AddSkill
