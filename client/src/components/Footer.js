import '../style/App.css';

import github from "../image/icons8-github-30.png";
import linkedin from "../image/icons8-linkedin-50.png";
import medium from "../image/icons8-medium-50.png";

function Footer() {
 

  
  return (
    <div className="footer" id="the-footer" >
      <div className='footer-icons'>
        <a href='https://github.com/OneShepForward/'><img className='icon' alt='icon' src={github} /></a>
        <a href='https://www.linkedin.com/in/shephardn/'><img className='icon' alt='icon' style={{height: "2em", width: "2em"}} src={linkedin} /></a>
        <a href='https://medium.com/@oneshepforward'><img className='icon' alt='icon' style={{height: "2em", width: "2em"}} src={medium} /></a>
        <p>Created by Nick Shephard</p>
      </div>
    </div>
  );
}

export default Footer;
