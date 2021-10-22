import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import axios from 'axios';
import { BASE_URL } from "../../app/config";
import './Applications.css'


function ApplicationDetail(props) {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}api/js/vacancy/applications/${id}`, { headers })
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

    const goBackHome = () => {
        props.history.goBack();
    }

    return (
        <>
            <Header />
            <button className="goBack" onClick={goBackHome}>Go Back</button>
            <div className="detail">
                {
                    isLoading ?
                        <p>loading....</p> :
                        data.length > 0 ?
                            <div className="jobVacancyTitle">
                                <h2>{data && data[0].vacancy.title}</h2>
                                <h2>{data && data[0].vacancy.location}</h2>
                                <h6>${data && data[0].vacancy.salaryRangFrom} - ${data[0].vacancy.salaryRangTo}</h6>
                            </div> : <p>No applications for this posting</p>}

                <div className="applicants">
                    {
                        data.length > 0 &&
                        data.map((item, index) => (
                            <div key={index} className="applicantCards">
                                <h3>Job Seeker Id: {item.jobSeekerId}</h3>

                            </div>
                        ))
                    }
                </div>


            </div>
        </>
    )
}

export default ApplicationDetail
