import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../image/lokstok_cover_photo.png";

import Button from '@mui/material/Button';


function Header({ currentEmployee, isAuthenticated, onLogout }) {

if (currentEmployee) { 

    return (
    <div className="Header">
      <br/>
      <div className="imgbox">
        <img src={logo} alt="LokStok Logo" className="center-fit"/>
      </div>
      <h2 id="header"> Signed in as <i>{currentEmployee.name}</i> </h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Button 
          component={NavLink}
          variant= "outlined"
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#3d6a66" : "",
              backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #d0c3bd 100%)" : ""
            };
          }}
          to="/"
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
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#3d6a66" : "",
              // backgroundColor: isActive ? "#d0c3bd" : ""
              backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #d0c3bd 100%)" : ""
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
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#3d6a66" : "",
              backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #d0c3bd 100%)" : ""
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
          to="/"
          onClick={() => onLogout()}  
        >Logout</Button>


      </nav>
    </div>
    );

  } else {

  return (
    <div className="Header">
      <div className="imgbox">
        <img src={logo} alt="LokStok Logo" className="center-fit"/>
      </div>
      <h2 id="header"> Please sign in or register to continue </h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
      </nav>
    </div>
  );

}

}

export default Header;
