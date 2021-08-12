import React, { useState } from 'react';
import { BASE_URL } from '../../app/config';
import axios from "axios";
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCertificate(props) {
    const [name, setname] = useState("");
    const [issuedBy, setissuedBy] = useState("");
    const [issueDate, setissueDate] = useState("");
    const [expirationDate, setexpirationDate] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const notify = () => toast.success("Certificate Successfully added");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }

    const submitAction = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${BASE_URL}api/certificates/`, {
            name,
            issuedBy,
            issueDate,
            expirationDate
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

                <h3>Add A Certificate</h3>
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
                    <input type="text" placeholder="Name" required onChange={(t) => setname(t.target.value)} />
                    <input type="text" placeholder="Issue Date e.g 2020-09-09" required onChange={(t) => setissueDate(t.target.value)} />
                    <input type="text" placeholder="Issued by" required onChange={(t) => setissuedBy(t.target.value)} />
                    <input type="text" placeholder="Expiration Date e.g 2020-09-09" required onChange={(t) => setexpirationDate(t.target.value)} />

                    <button type="submit" onClick={submitAction}>Add Certificate</button>
                </form>
            </div>
        </>
    )
}

export default AddCertificate
