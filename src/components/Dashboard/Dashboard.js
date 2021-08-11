import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Dashboard.css';
import ClockIcon from "@material-ui/icons/Timer";
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import LikeIcon from "@material-ui/icons/ThumbUpTwoTone"
import JobDetail from './JobDetail';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../app/config";
import BackIcon from "@material-ui/icons/ArrowBackTwoTone"

function Dashboard(props) {
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState(true);
    const [detailProps, setDetailProps] = useState({});
    const notify = () => toast.success("Wow so easy!");

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
            <div className="Dashboard">

                {/* SIDELIST */}

                {showDetails && <div className="content">
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className="sidebar" onClick={() => {
                                    setShowDetails(false);
                                    window.scrollTo(0, 0);
                                    setDetailProps(item);

                                }}>
                                    <h2>{item.title}</h2>
                                    <p>Location: {item.location}</p>

                                    <div className="sidebar__tags">
                                        <h6>Urgently hiring <span><ClockIcon /></span></h6>
                                        <h6>Responsive Employer <span><ThumbsUp /></span></h6>
                                    </div>

                                    <div className="sidebar__description">
                                        <p>Description:</p>
                                        <p>{item.jobDescription}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>}

                {/* SIDELIST */}

                {/* JOB DETAIL */}
                {
                    !showDetails &&
                    <>
                        <button className="goBack" onClick={() => {
                            setShowDetails(true);
                        }}><BackIcon /></button>
                        <JobDetail
                            title={detailProps.title}
                            location={detailProps.location}
                            description={detailProps.jobDescription}
                            id={detailProps.id}
                            postFromDate={detailProps.postFromDate}
                            postToDate={detailProps.postToDate}
                            salaryRangFrom={detailProps.salaryRangFrom}
                            salaryRangTo={detailProps.salaryRangTo}

                            onClick={notify}
                        />
                        <ToastContainer />
                    </>

                }
                {/* JOB DETAIL */}
            </div>
        </>
    )
}

export default Dashboard
