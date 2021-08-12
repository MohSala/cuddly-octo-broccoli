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
        axios.get(`${BASE_URL}api/vacancy/applications/${id}`, { headers })
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
                                <h3>Name: {item.jobSeeker.user.name}</h3>
                                <h3>Country: {item.jobSeeker.country}</h3>
                                <h3>Applied On: {item.applyDate}</h3>
                                <h3>Current Position: {item.jobSeeker.currentPosition}</h3>
                                <h4>Education:</h4>
                                {item.jobSeeker.educations.length > 0 ?
                                    item.jobSeeker.educations.map((iE, ind) => (
                                        <ul key={ind}>
                                            <li>Degree:{iE.degree}</li>
                                            <li>From:{iE.fromDate} - To: {iE.toDate}</li>
                                        </ul>
                                    )) : <p>None listed</p>
                                }
                                <h4>Experience:</h4>
                                {item.jobSeeker.workExperiences.length > 0 ?
                                    item.jobSeeker.workExperiences.map((iE, ind) => (
                                        <ul key={ind}>
                                            <li>Company:{iE.companyName}</li>
                                            <li>Position: {iE.position}</li>
                                            <li>Last Salary: {iE.lastSalary}</li>
                                        </ul>
                                    )) : <p>None listed</p>
                                }
                                <h4>Certificate:</h4>
                                {item.jobSeeker.certificates.length > 0 ?
                                    item.jobSeeker.certificates.map((iE, ind) => (
                                        <ul key={ind}>
                                            <li>Name:{iE.name}</li>
                                            <li>Serial Number: {iE.serialNumber}</li>
                                            <li>Issued By: {iE.issuedBy}</li>
                                        </ul>
                                    )) : <p>None listed</p>
                                }
                            </div>
                        ))
                    }
                </div>


            </div>
        </>
    )
}

export default ApplicationDetail
