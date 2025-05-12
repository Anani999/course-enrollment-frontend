import Course_assign from '../assets/icons/Course Assign.png';
import Home from '../assets/icons/Home.png';
import Money_Bag from '../assets/icons/Money Bag.png';
import Sort_Down from '../assets/icons/Sort Down.png';
import profile_picture from '../assets/google_anani.png';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

function Navbar(){
    return(
        <div className="navbar">
            <div className="nav-items">
                <NavLink to=''>
                <div className="nav-item">
                    <img src={Home} alt="logo" className='nav-item-logo'/>
                    <span>Home</span>
                </div>
                </NavLink>
                <NavLink to='courses/'>
                <div className="nav-item">
                    <img src={Course_assign} alt="logo" className='nav-item-logo'/>
                    <span>Courses</span>
                </div>
                </NavLink>
                <NavLink to="jobs">
                <div className="nav-item">
                    <img src={Money_Bag} alt="logo" className='nav-item-logo'/>
                    <span>Monetize</span>
                </div>
                </NavLink>
                <div className="user-profile">
                    <div className="user-profile-img">
                        <img className="profile-img" src={profile_picture} alt="profile" />
                        <img className="arrow-down" src={Sort_Down} alt="arrow-down" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;