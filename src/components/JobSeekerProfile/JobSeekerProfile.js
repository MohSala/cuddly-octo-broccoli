import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Link } from "react-router-dom";
import './JobSeekerProfile.css';
import { BASE_URL } from "../../app/config";
import axios from "axios";



function JobSeekerProfile() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const jobseeker = JSON.parse(localStorage.getItem("jobseeker"));
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}api/ca/job-seeker/${jobseeker.id}`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)
                setData({jobSeeker:response.data});
                setLoading(false)
            })
            .catch((e) => {
                console.log("ERROR", e.message)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            <Header />

            <div className="buttonsForEdit">
                <Link to='/add-skill'>
                    <button className="skillButton">Add Skill</button>
                </Link>
                <Link to='/add-experience'>
                    <button className="skillButton"
                        style={{ backgroundColor: "blueviolet" }}>
                        Add Experience</button>
                </Link>
                <Link to='/add-certificate'>
                    <button className="skillButton"
                        style={{ backgroundColor: "green" }}>
                        Add Certificate</button>
                </Link>
            </div>
            <div className="profileCard">
                <h3>PROFILE</h3>
                {
                    Object.keys(data).length > 0 &&

                    <div className="profileItems">
                        <h3>Current Position: {data.jobSeeker.currentPosition}</h3>
                        <h4>Education:</h4>
                        {data.jobSeeker.educations.length > 0 ?
                            data.jobSeeker.educations.map((iE, ind) => (
                                <ul key={ind}>
                                    <li>Degree:{iE.degree}</li>
                                    <li>From:{iE.fromDate} - To: {iE.toDate}</li>
                                </ul>
                            )) : <p>None listed</p>
                        }
                        <h4>Experience:</h4>
                        {data.jobSeeker.workExperiences.length > 0 ?
                            data.jobSeeker.workExperiences.map((iE, ind) => (
                                <ul key={ind}>
                                    <li>Company:{iE.companyName}</li>
                                    <li>Position: {iE.position}</li>
                                    <li>Last Salary: {iE.lastSalary}</li>
                                </ul>
                            )) : <p>None listed</p>
                        }
                        <h4>Certificate:</h4>
                        {data.jobSeeker.certificates.length > 0 ?
                            data.jobSeeker.certificates.map((iE, ind) => (
                                <ul key={ind}>
                                    <li>Name:{iE.name}</li>
                                    <li>Serial Number: {iE.serialNumber}</li>
                                    <li>Issued By: {iE.issuedBy}</li>
                                </ul>
                            )) : <p>None listed</p>
                        }
                        <h4>Skills:</h4>
                        {data.jobSeeker.jobSeekerSkills.length > 0 ?
                            data.jobSeeker.jobSeekerSkills.map((iE, ind) => (
                                <ul key={ind}>
                                    <li>Name:{iE.name}</li>
                                </ul>
                            )) : <p>None listed</p>
                        }
                    </div>

                }

            </div>
        </div>
    )
}

export default JobSeekerProfile
