import React, { useState, useEffect } from 'react'
import Header from '../Header/Header';
import ClockIcon from "@material-ui/icons/Timer";
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import axios from 'axios';
import { BASE_URL } from "../../app/config";
import './PendingVacancies.css';
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PendingVacancies() {
    const [data, setData] = useState([]);

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        axios.get(`${BASE_URL}api/js/vacancy/pending-approval/`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(response.data)
            })
            .catch((e) => {
                console.log("ERROR", e.message)
            })
    }, [])


    const changeStatus = (e,status,id) => {
        e.preventDefault();
        axios.put(`${BASE_URL}api/js/vacancy/change-status/${id}`, {
            status:status
        },{ headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(data.filter(d => d.id !== id))
                if(status == "Published"){
                    toast("Posting Approval Successfully")
                }else{
                    toast("Posting Rejection Successfully")
                }

            })
            .catch((e) => {
                alert(JSON.parse(e.request.response).message);
                console.log("ERROR",e)
            })
    }

    return (
        <>

            <Header  />
            <ToastContainer />
            <div className="content">
                <h1>Pending Approval Vacancies</h1>
                {data.length == 0 && <h3>No Pending Vacancies</h3>}
                {data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div key={index} className="sidebar" onClick={() => {


                            }}>
                                <h2>{item.title}</h2>
                                <p>Location: {item.location}</p>

                                <div className="sidebar__description">
                                    <p>Description:</p>
                                    <p>{item.jobDescription}</p>
                                </div>

                                <form>
                                    <button onClick={(e) => changeStatus(e,"Published", item.id)}>Approve</button>
                                    <button onClick={(e) => changeStatus(e,"Canceled", item.id)}>Reject</button>
                                </form>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default PendingVacancies
