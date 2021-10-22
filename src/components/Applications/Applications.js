import React, { useState, useEffect } from 'react'
import Header from '../Header/Header';
import ClockIcon from "@material-ui/icons/Timer";
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import axios from 'axios';
import { BASE_URL } from "../../app/config";
import './Applications.css';
import { Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Applications(props) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}api/js/vacancy/`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(response.data)
                setLoading(false)
            })
            .catch((e) => {
                console.log("ERROR", e.message)
                setLoading(false)
            })
    }, [])


    return (
        <>

            <Header />
            <ToastContainer />


            <div className="content">

                {isLoading ?
                    <p>loading....</p> :
                    data.length > 0 ?
                        data.map((item, index) => {
                            return (
                                <Link key={index} to={`/application/${item.id}`} className="sidebar" style={{ textDecoration: "none", color: "#000" }}>
                                    <div onClick={() => {


                                    }}>
                                        <h2>{item.title}</h2>
                                        <p>Location: {item.location}</p>

                                    </div>
                                </Link>
                            )
                        }) : <p>No vacancies listed</p>
                }
            </div>
        </>
    )
}

export default Applications
