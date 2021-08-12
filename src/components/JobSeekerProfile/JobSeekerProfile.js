import React from 'react'
import Header from '../Header/Header'
import { Link } from "react-router-dom";
import './JobSeekerProfile.css';

function JobSeekerProfile() {
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
        </div>
    )
}

export default JobSeekerProfile
