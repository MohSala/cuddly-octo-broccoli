import React, { useState, useEffect } from 'react'
import Header from '../Header/Header';
import ClockIcon from "@material-ui/icons/Timer";
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import axios from 'axios';
import { BASE_URL } from "../../app/config";
import './OurVacancy.css';
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OurVacancy(props) {
    const [data, setData] = useState([]);
    const notify = () => toast("Posting Deleted Successfully");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        axios.get(`${BASE_URL}api/vacancy/`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(response.data)
            })
            .catch((e) => {
                console.log("ERROR", e.message)
            })
    }, [])


    const deletePosting = (e, id) => {
        e.preventDefault();
        axios.delete(`${BASE_URL}api/vacancy/${id}`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(data.filter(d => d.id !== id))
                notify()
            })
            .catch((e) => {
                toast.error(JSON.parse(e.request.response).message);
                console.log("ERROR",e)
            })
    }

    const StatusMap = {
        "Published":"Approved",
        "Draft":"Pending Approval",
        "Canceled":"Rejected",
    }

    return (
        <>

            <Header />
            <ToastContainer />
            <div className="content">
                <h1>Our Vacancies</h1>
                <Link to='/add-vacancy' style={{ textDecoration: "none" }}>
                    <button className="addVacancy">Add New Vacancy</button>

                </Link>
                <hr/>
                {data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div key={index} className="sidebar" onClick={() => {


                            }}>
                                <h2>{item.title}</h2>
                                <p><b>Location</b>: {item.location}</p>
                                <p className={item.vacancyStatus}><b>Status</b>: { StatusMap[item.vacancyStatus]}</p>

                                <div className="sidebar__description">
                                    <p>Description:</p>
                                    <p>{item.jobDescription}</p>
                                </div>

                                <form>
                                    <button onClick={(e) => deletePosting(e, item.id)}>Delete Vacancy</button>
                                    <Link to={"/application/"+item.id}>
                                        <button>View Applications</button>
                                    </Link>
                                </form>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default OurVacancy
