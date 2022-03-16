import '../style/App.css';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import logo from "../image/lokstok_cover_photo.png";



function NotFound() {
  // imports currentEmployee state from HomePage
  
  return (
    <div className="app">
      <div id="main">
        <div id="top-to-footer">
          <div className="header">
            <div className="imgbox">
              <img src={logo} alt="LokStok Logo" className="center-fit"/>
            </div>
          </div>
          <div className="not-found-body">
            <h2>Sorry, this page isn't available.</h2>
            <h4>Please check the url or <NavLink to="/home">click here to return home.</NavLink></h4>
          </div>
        </div>
          <div>
            <Footer />
          </div>
      </div>
    </div>

    
  );
}

export default NotFound;
