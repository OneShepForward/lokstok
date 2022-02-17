import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import github from "../image/icons8-github-30.png";
import linkedin from "../image/icons8-linkedin-50.png";
import medium from "../image/icons8-medium-50.png";
// import Pic from "../image/ProfilePicture.png"

function Footer() {
 

  
  return (
    <div className="Footer" id="the-footer" >
      <div className='footer-icons' style={{borderTop: "solid 1px", borderColor: "#1d2424" }}>
        <a href='https://github.com/OneShepForward/'><img className='icon' alt='icon' src={github} /></a>
        <a href='https://www.linkedin.com/in/shephardn/'><img className='icon' alt='icon' style={{height: "2em", width: "2em"}} src={linkedin} /></a>
        <a href='https://medium.com/@oneshepforward'><img className='icon' alt='icon' style={{height: "2em", width: "2em"}} src={medium} /></a>
        <p>Created by Nick Shephard</p>
      </div>
    </div>
  );
}

export default Footer;
