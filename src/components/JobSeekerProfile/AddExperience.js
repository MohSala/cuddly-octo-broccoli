import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import axios from "axios";
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddExperience(props) {
    const [companyName, setcompanyName] = useState("");
    const [fromDate, setfromDate] = useState("");
    const [toDate, settoDate] = useState("");
    const [lastSalary, setlastSalary] = useState(0);
    const [position, setposition] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const notify = () => toast.success("Experience Successfully added");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }

    const submitAction = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${BASE_URL}api/work-experince/`, {
            companyName,
            fromDate,
            toDate,
            lastSalary,
            position,
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

                <h3>Add an Experience</h3>
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
                    <input type="text" placeholder="Company Name" required onChange={(t) => setcompanyName(t.target.value)} />
                    <input type="text" placeholder="Worked from e.g 2020-09-09" required onChange={(t) => setfromDate(t.target.value)} />
                    <input type="text" placeholder="Worked to e.g 2020-09-09" required onChange={(t) => settoDate(t.target.value)} />
                    <input type="text" placeholder="Last Salary" required onChange={(t) => setlastSalary(t.target.value)} />
                    <input type="text" placeholder="Last Position" required onChange={(t) => setposition(t.target.value)} />

                    <button type="submit" onClick={submitAction}>Add Experience</button>
                </form>
            </div>
        </>
    )
}

export default AddExperience
