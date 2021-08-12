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


    return (
        <>

            <Header />
            <ToastContainer />


            <div className="content">

                {data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <Link to={`/application/${item.id}`} className="sidebar" style={{ textDecoration: "none", color: "#000" }}>
                                <div key={index} onClick={() => {


                                }}>
                                    <h2>{item.title}</h2>
                                    <p>Location: {item.location}</p>

                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Applications
