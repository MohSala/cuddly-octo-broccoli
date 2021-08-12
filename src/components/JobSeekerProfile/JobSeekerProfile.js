import React from 'react'
import Header from '../Header/Header'
import { Link } from "react-router-dom";


function JobSeekerProfile() {
    return (
        <div>
            <Header />

            <div className="buttonsForEdit">
                <Link to='/add-skill'>
                    <button>Add Skill</button>
                </Link>
            </div>
        </div>
    )
}

export default JobSeekerProfile
