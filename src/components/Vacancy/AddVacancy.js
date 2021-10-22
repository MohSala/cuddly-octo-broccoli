import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import './AddVacancy.css';
import axios from "axios";
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddVacancy(props) {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [postFrom, setPostFrom] = useState("");
    const [postTo, setPostTo] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const notify = () => toast.success("Vacancy Successfully created. Admin will review");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }

    const submitAction = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("object", title,
            description,
            postFrom,
            postTo,
            salaryFrom,
            salaryTo)
        axios.post(`${BASE_URL}api/js/vacancy`, {
            title: title,
            location,
            jobDescription: description,
            postFromDate: postFrom,
            postToDate: postTo,
            salaryRangFrom: salaryFrom,
            salaryRangTo: salaryTo
        }, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setLoading(false);
                setError(false);
                notify();
                setTimeout(() => {
                    props.history.push("/our-vacancy");
                }, 3000);
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
            <div className="AddVacancy">
                <h3>Add A Vacancy</h3>
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
                    <input type="text" placeholder="Title" required onChange={(t) => setTitle(t.target.value)} />
                    <input type="text" placeholder="Location" required onChange={(t) => setLocation(t.target.value)} />
                    <textarea rows="4" cols="30" placeholder="Description" required onChange={(t) => setDescription(t.target.value)} />
                    <div className="from_to">
                        <input type="text" placeholder="Post From" required onChange={(t) => setPostFrom(t.target.value)} />
                        <input type="text" placeholder="Post To" required onChange={(t) => setPostTo(t.target.value)} />
                    </div>
                    <div className="salary_from_to">
                        <input type="text" placeholder="Min. Salary" required onChange={(t) => setSalaryFrom(t.target.value)} />
                        <input type="text" placeholder="Max. Salary" required onChange={(t) => setSalaryTo(t.target.value)} />
                    </div>

                    <button type="submit" onClick={submitAction}>Add Vacancy</button>
                </form>
            </div>
        </>
    )
}

export default AddVacancy
