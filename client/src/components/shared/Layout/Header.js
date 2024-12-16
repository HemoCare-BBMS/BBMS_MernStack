import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import{useSelector}from "react-redux";
import{useNavigate } from 'react-router-dom';

const Header = () => {
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    //logout handler
    const handleLogout = () => {
        localStorage.clear();
        alert("Logout Successfuly");
        navigate('/login');
        
    }
  return (
    <>
      <nav className='navbar'>
        <div className='container-fluid'>
        <div className='navbar-brand'><img  className='logo'src ='./assets/images/hemocarelogo.jpg' alt='blood donation'/> Hemo Care</div>
        <ul className='navbar-nav flex-row'>
            <li className='nav-item mx-3'>
                <p className='nav-link'>
                 <FaRegUserCircle /> Welcome {user?.name || user?.organizationName} {" "}
                 &nbsp;
                 <span class="badge text-bg-secondary">{user?.role}</span>
                </p>
            </li>
            <li className='nav-item mx-3'>
                <button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                </button>
            </li>
        </ul>
        </div>
      </nav>
    </>
  )
}

export default Header;
