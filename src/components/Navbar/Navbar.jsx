import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
import {IoMdRocket} from "react-icons/io";

const Navbar = () => {

    const [navToggle, setNavToggle] = useState(false);
    const navHandler = () => {
        setNavToggle(prevData => !prevData);
    }

  return (
    <nav className='navbar w-100 flex'>
        <div className='container w-100'>
            <div className='navbar-content flex fw-7'>
                <div className='brand-and-toggler flex flex-between w-100'>
                    <Link to = "/" className='navbar-brand fs-26'>CLOUD ERA</Link>
                    <div type = "button" className={`hamburger-menu ${navToggle ? 'hamburger-menu-change' : ""}`} onClick={navHandler}>
                        <div className='bar-top'></div>
                        <div className='bar-middle'></div>
                        <div className='bar-bottom'></div>
                    </div>
                </div>

                <div className={`navbar-collapse ${navToggle ? 'show-navbar-collapse' : ""}`}>
                    <div className='navbar-collapse-content'>
                        <ul className='navbar-nav'>
                            <li className='text-white'>
                                <Link to = "/">Home</Link>
                            </li>
                            <li className='text-white'>
                                <Link to = "/">About</Link>
                            </li>
                            <li className='text-white'>
                                <Link to = "/">News</Link>
                            </li>
                            <li className='text-white'>
                                <Link to = "/">Contacts</Link>
                            </li>
                        </ul>
                        <div className='navbar-btns'>
                            <Link to="/signin" className='btn'>
                                        <IoMdRocket /> <span>Sign In</span>
                                      </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
