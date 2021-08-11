import React from 'react';
import './AddVacancy.css';


function AddVacancy() {
    return (
        <div className="AddVacancy">
            <h3>Add A Vacancy</h3>
            <form>
                <input type="text" placeholder="Title" />
                <textarea rows="4" cols="30" placeholder="Description" />
                <div className="from_to">
                    <input type="text" placeholder="Post From" />
                    <input type="text" placeholder="Post To" />
                </div>
                <div className="salary_from_to">
                    <input type="text" placeholder="Min. Salary" />
                    <input type="text" placeholder="Max. Salary" />
                </div>

                <button>Add Vacancy</button>
            </form>
        </div>
    )
}

export default AddVacancy
