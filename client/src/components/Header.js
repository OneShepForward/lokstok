import '../style/App.css';
import { NavLink } from "react-router-dom";

import Button from '@mui/material/Button';

import logo from "../image/lokstok_cover_photo.png";


function Header({ currentEmployee, onLogout }) {

// if logged in, display a different nav  
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
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
            to="/home"
          >Home</Button>
          
          <Button 
            component={NavLink}
            variant= "outlined"
            to="/inventory"
            state={{logged_in: currentEmployee}}
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
          >Inventory</Button>
          
          <Button 
            component={NavLink}
            variant="outlined"
            to="/create_item"
            state={{logged_in: currentEmployee}}
            style={({ isActive }) => {
              return {
                fontWeight: "bold",
                color: "#1d2424",
                backgroundImage: isActive ? "linear-gradient(315deg, #ffffff 0%, #69849b 100%)" : ""
              };
            }}
          >Shipments</Button>

          <Button 
            component={NavLink}
            variant="outlined"
            style={{
              fontWeight: "bold",
              color: "#1d2424",
            }}
            to="/home"
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
            to="/home"
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
