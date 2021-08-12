import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Header from '../Header/Header';
import './Dashboard.css';
import ClockIcon from "@material-ui/icons/Timer";
import SearchIcon from '@material-ui/icons/Search';
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import LikeIcon from "@material-ui/icons/ThumbUpTwoTone"
import JobDetail from './JobDetail';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../app/config";
import { logout, selectUser } from '../../features/userSlice';
import BackIcon from "@material-ui/icons/ArrowBackTwoTone"

function Dashboard(props) {
    const user = useSelector(selectUser);
    const [data, setData] = useState([]);
    const [showDetails, setShowDetails] = useState(true);
    const [detailProps, setDetailProps] = useState({});
    const notify = () => toast.success("Wow so easy!");
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [searchText, setSearchText] = useState("");

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }


    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}api/vacancy/approved`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData(response.data)
                setLoading(false);
            })
            .catch((e) => {
                console.log("ERROR", e.message)
                setLoading(false);
            })
    }, [])

    const applyToJob = (_, id) => {
        axios.post(`${BASE_URL}api/vacancy/apply/${id}`, {}, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setLoading(false);
                notify();
            })
            .catch((e) => {
                console.log("ERROR", e.response.data.message)
                setError(true);
                setErrorMsg(e.response.data.message);
                setLoading(false);
            })
    }

    const searchPostings = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.get(`${BASE_URL}api/search/vacancy/${searchText}`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data.result)
                setData(response.data.result)
                setLoading(false);
            })
            .catch((e) => {
                console.log("ERROR", e.message)
                setLoading(false);
            })
    }

    return (
        <>
            <Header />
            <div className="header__search">
                <SearchIcon />
                <form onSubmit={searchPostings}>
                    <input type="text" onChange={e => setSearchText(e.target.value)} />
                </form>
            </div>

            {
                error &&
                <p className="errorText">{errorMsg}</p>
            }
            <div className="Dashboard">

                {/* SIDELIST */}


                {showDetails && <div className="content">
                    <h1>Dashboard</h1>
                    {
                        isLoading ?
                            <p>Loading...</p> :
                            data.length > 0 ?
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
                                }) :
                                <h1>There are no available listings at this time. Check back later</h1>
                    }
                </div>}

                {/* SIDELIST */}

                {/* JOB DETAIL */}
                {
                    !showDetails &&
                    <>
                        <button className="goBack" onClick={() => {
                            setShowDetails(true);
                            setError(false)
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

                            onClick={e => applyToJob(e, detailProps.id)}
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
