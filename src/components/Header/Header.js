import React, { useEffect } from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MessageIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import HeaderOption from './HeaderOption';
import { BASE_URL } from '../../app/config'

function Header() {
    const token = localStorage.getItem("token")
    const headers = {
        'Authorization': `Bearer ${token}`
    }


    useEffect(() => {
        axios.get(`${BASE_URL}user/me`, { headers })
            .then((response) => {
                console.log("RESP>> ", response.data)

            })
            .catch((e) => {
                console.log("ERROR", e.message)
            })
    }, [])

    return (
        <div className="header">

            <div className="header__left">
                <img src="https://media.istockphoto.com/vectors/yellow-lines-geometric-vector-logo-letter-j-vector-id1171091309?k=6&m=1171091309&s=612x612&w=0&h=_4JI3satM1UqjY-lq8Q2CGniIsSap0PhFwPhcC2Woho=" alt="" />

                <div className="header__search">
                    <SearchIcon />
                    <input type="text" />
                </div>

            </div>


            <div className="header__right">
                <HeaderOption title="Home" Icon={HomeIcon} />
                <HeaderOption title="Companies" Icon={SupervisorAccountIcon} />
                <HeaderOption title="Vacancies" Icon={BusinessCenterIcon} />
                {/* <HeaderOption title="Message" Icon={MessageIcon} /> */}
                {/* <HeaderOption title="Notifications" Icon={NotificationsIcon} /> */}
                <HeaderOption avatar={true} title="Me" onClick={() => { }} />
            </div>


        </div>
    )
}

export default Header
