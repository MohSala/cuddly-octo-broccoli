import React, { useEffect, useContext } from 'react'
import ClockIcon from "@material-ui/icons/Timer";
import ThumbsUp from "@material-ui/icons/ThumbUpSharp"
import LikeIcon from "@material-ui/icons/ThumbUpTwoTone"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import { BASE_URL } from '../../app/config';
import { LikedPosts } from "../../app/context";
import { logout, selectUser } from '../../features/userSlice';
import axios from "axios";

function JobDetail({
    id, title, company,
    location, onClick, description,
    postFromDate, postToDate, salaryRangFrom,
    salaryRangTo
}) {
    const user = useSelector(selectUser);
    const { likedPosts, setLikedPosts } = useContext(LikedPosts);

    useEffect(() => {
        console.log("Liked Psot ", likedPosts);
    }, []);

    return (
        <div className="jobDetail">
            <h2>{title}</h2>
            <p className="post_duration">Employer posted this vacancy from: {postFromDate} - {postToDate}</p>
            <p>{company}</p>
            <p>Location: {location}</p>

            <div className="jobDetail__actionbuttons">
                {
                    user && user.role   == "ROLE_JOBSEEKER" &&
                    <button className="applyButton" onClick={onClick}>Apply Now</button>

                }
                {
                    likedPosts.includes(id) ?
                        <p> You liked this! </p> :
                        <button onClick={() =>
                            setLikedPosts([...likedPosts, id])}
                            className="likeButton"><LikeIcon /> </button>

                }
            </div>

            <div className="jobDetail__description">
                <h4>Salary range: ${salaryRangFrom} - ${salaryRangTo}</h4>
                <h6>Urgently hiring <span><ClockIcon /></span></h6>
                <div className="jobDetail__type">
                    <p className="detail">Job-Type</p>
                    <p>Full-Time</p>
                </div>
                <p>Description:</p>
                <p>{description}</p>
            </div>

        </div>
    )
}

export default JobDetail
