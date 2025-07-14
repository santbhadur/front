import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGlobe } from '@fortawesome/free-solid-svg-icons'
import {Outlet,  Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <nav>
        <input type="checkbox" id="check" />
        <label for="check" class="checkbtn">
        < FontAwesomeIcon icon={faBars}  />
        <span>Menu</span>
        <FontAwesomeIcon icon={faGlobe}  />
        <span class="bar" > English</span>
        
        </label>
        
        <label class="logo">Apartment.com</label>
        <ul>
          
          
          <li><Link to="/ManageRendal">Manage Rendal</Link></li>
          <li><a href='#'>Sign In</a></li>
          <li><a href='#'>Sign Up</a></li >
          <li><a href='active'>Added a Property</a></li>
        </ul>
      </nav>
    </>
  );
}
