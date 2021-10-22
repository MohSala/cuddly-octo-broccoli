import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Header.css';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MessageIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import EditIcon from "@material-ui/icons/Edit"
import axios from 'axios';
import HeaderOption from './HeaderOption';
import { BASE_URL } from '../../app/config'
import { login } from '../../features/userSlice';
import { logout, selectUser } from '../../features/userSlice';
import { Link } from "react-router-dom";

function Header(props) {
    let user = useSelector(selectUser);
    user = JSON.parse(JSON.parse(user))
    const dispatch = useDispatch();

    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }


    useEffect(() => {

        /*axios.get(`${BASE_URL}user/me`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data);
                let u = localStorage.getItem("user");
                if (u) {
                    u = JSON.parse(u);
                }
                // dispatch(login(u))
            })
            .catch((e) => {
                console.log("ERROR", e.message)
            })*/
    }, [])
    console.log(user);
    const logout = () => {
        localStorage.clear();
        window.location.replace('/login');
    }

    return (
        <div className="header">
            {
                !user && window.location.replace('/login')
            }
            <div className="header__left">
                <img src="https://media.istockphoto.com/vectors/yellow-lines-geometric-vector-logo-letter-j-vector-id1171091309?k=6&m=1171091309&s=612x612&w=0&h=_4JI3satM1UqjY-lq8Q2CGniIsSap0PhFwPhcC2Woho=" alt="" />

            </div>


            <div className="header__right">
                <Link to='/dashboard' style={{ textDecoration: "none" }}>
                    <HeaderOption title="Home" Icon={HomeIcon} />
                </Link>
                {
                    user && user.role == "ROLE_COMPANY" &&
                    <>
                        <Link to='/applications' style={{ textDecoration: "none" }}>
                            <HeaderOption title="Applications" Icon={SupervisorAccountIcon} />
                        </Link>
                        <Link to='/our-vacancy' style={{ textDecoration: "none" }}>
                            <HeaderOption title="Our Vacancies" Icon={BusinessCenterIcon} />
                        </Link>
                    </>
                }

                {
                    user && user.role == "ROLE_ADMIN" &&
                    <>
                        <Link to='/pending-vacancy' style={{ textDecoration: "none" }}>
                            <HeaderOption title="Pending Vacancies" Icon={BusinessCenterIcon} />
                        </Link>
                    </>
                }

                {
                    user && user.role == "ROLE_JOBSEEKER" &&
                    <Link to='/experience' style={{ textDecoration: "none" }}>

                        <HeaderOption title="Experience & Education" Icon={EditIcon} />
                    </Link>
                }

                <HeaderOption avatar={true} title={user.name} onClick={() => { }} />
                <HeaderOption title="Logout" Icon={LogoutIcon} onClick={logout} />
            </div>


        </div>
    )
}

export default Header
