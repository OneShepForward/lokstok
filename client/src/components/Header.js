import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../image/lokstok_cover_photo.png";


function Header({ currentEmployee, isAuthenticated }) {

if (currentEmployee) { 

    return (
    <div className="Header">
      <img src={logo} alt="LokStok Logo"/>
      <h2 id="header"> Welcome, {currentEmployee.name} </h2>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
      </nav>
    </div>
    );

  } else {

  return (
    <div className="Header">
      <img src={logo} alt="LokStok Logo"/>
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
