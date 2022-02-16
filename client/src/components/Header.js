import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../image/lokstok_cover_photo.png";


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
        <Link 
          to="/"
          // activeClassName="active"
          // react-dom.development.js:67 Warning: React does not recognize the `activeClassName` prop on a DOM element...
        >Home</Link>
        
        <Link 
          to="/inventory"
          state={{logged_in: currentEmployee}}
          // activeClassName="active"
        >View Inventory</Link>
        
        <Link 
          to="/create_item"
          state={{logged_in: currentEmployee}}
          // activeClassName="active"
        >Add Shipment</Link>
        
        {/* <Link 
          to="/settings"
          // activeClassName="active"
        >Account Settings</Link>
         */}

        <Link 
          to="/"
          onClick={() => onLogout()}  
        >Logout</Link>


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
