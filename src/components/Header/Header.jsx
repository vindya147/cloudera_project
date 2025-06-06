import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./Header.css";
import { FaPaperPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header flex flex-center flex-column'>
      <Navbar />
      <div className='container'>
        <div className='header-content text-center flex flex-column'>
          <h1 className='text-uppercase header-title'>Explore Our Best Solution</h1>
          <p className='text-lead'>We aim to streamline operations by providing users with multi-cloud cost comparison, troubleshooting assistance, configuration guidance, and security best practices.</p>
          <Link to="/signin" className='btn header-btn btn-blue'>
            <FaPaperPlane /> <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
