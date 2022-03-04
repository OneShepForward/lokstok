import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../image/lokstok_cover_photo.png";

import Button from '@mui/material/Button';


function Header({ currentEmployee, isAuthenticated, onLogout }) {

  
if (currentEmployee) { 

    return (
    <div className="header">
      <br/>
      <div className="imgbox">
        <img src={logo} alt="LokStok Logo" className="center-fit"/>
      </div>
      <div id="banner">
        <h2 id="header"> Signed in as <i>{currentEmployee.name}</i> </h2>
        <nav>
          <Button 
            component={NavLink}
            variant= "outlined"
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                // fontWeight: isActive ? "bold" : "",
                // color: isActive ? "#3d6a66" : "",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
            to="/home"
            // activeClassName="active"
            // react-dom.development.js:67 Warning: React does not recognize the `activeClassName` prop on a DOM element...
          >Home</Button>
          
          <Button 
            component={NavLink}
            variant= "outlined"
            to="/inventory"
            state={{logged_in: currentEmployee}}
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                // fontWeight: isActive ? "bold" : "",
                // color: isActive ? "#3d6a66" : "",
                color: "#1d2424",
                // backgroundColor: isActive ? "#d0c3bd" : ""
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
            // activeClassName="active"
          >Inventory</Button>
          
          <Button 
            component={NavLink}
            variant="outlined"
            to="/create_item"
            state={{logged_in: currentEmployee}}
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                // fontWeight: isActive ? "bold" : "",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
            // activeClassName="active"
          >Shipments</Button>
          
          {/* <Link 
            to="/settings"
            // activeClassName="active"
          >Account Settings</Link>
          */}

          <Button 
            component={NavLink}
            variant="outlined"
            style={{
              fontWeight: "bold",
              color: "#1d2424",
            }}
            to="/"
            onClick={() => onLogout()}  
          >Logout</Button>


        </nav>
      </div>
    </div>
    );

  } else {

  return (
    <div className="header">
      <div className="imgbox">
        <img src={logo} alt="LokStok Logo" className="center-fit"/>
      </div>
      <h2 id="header"> Please sign in or register to continue </h2>
      
      <nav>
          <Button 
            component={NavLink}
            variant= "outlined"
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
            to="/"
          >Login</Button>
          
          <Button 
            component={NavLink}
            variant= "outlined"
            to="/signup"
            state={{logged_in: currentEmployee}}
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
          >Signup</Button>
      </nav>
    </div>
  );

}

}

export default Header;
