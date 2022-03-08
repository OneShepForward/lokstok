import '../style/App.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../image/lokstok_cover_photo.png";



function LoadScreen() {
  let navigate = useNavigate();

  useEffect(() => {
          const timer = setTimeout(() => {
            navigate('/home')
        }, 1800);

        //cleanup function 
        return function cleanup() {
            console.log("Running cleanup");
            // ✅ clear the interval so state is no longer updated
            clearInterval(timer);
            };

  }, []);

  return (
    <div id="load-page">
     <img src={logo} alt="LokStok Logo" className="load-logo"/>
    </div>
  );
}

export default LoadScreen;
