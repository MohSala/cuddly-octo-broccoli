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

function OurVacancy() {
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
                alert(JSON.parse(e.request.response).message);
                console.log("ERROR",e)
            })
    }

    return (
        <>

            <Header />
            <ToastContainer />
            <div className="content">
                <Link to='/add-vacancy' style={{ textDecoration: "none", alignSelf: "flex-end" }}>
                    <button className="addVacancy">Add New Vacancy</button>

                </Link>
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
                                    <button onClick={(e) => deletePosting(e, item.id)}>Delete Vacancy</button>
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
