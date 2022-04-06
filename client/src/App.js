import './style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

import loadingGif from "./image/lokstok_loading.gif";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [isLoaded, setLoaded] = useState(false)

  // This useEffect checks the cookies for a valid session[:id] 
  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((employee) => {
          setCurrentEmployee(employee);
          setIsAuthenticated(true);
        });
      }
    });
          // setLoaded(true)
    
        // -- To prevent coded in load time, comment out this block of code
        // !!! But don't forget to comment in the setLoaded(true) above!!!
            const timer = setTimeout(() => {
              setLoaded(true);
          }, 1500);

          //cleanup function 
          return function cleanup() {
              console.log("Running cleanup");
              // clear the interval so state is no longer updated
              clearInterval(timer);
              };
        // -- ^^ To prevent coded in load time, comment out this block of code ^^

  }, []);

  // delete the session when the user clicks Logout
  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(res => {
          if (res.ok) {
            setCurrentEmployee(null)
            setIsAuthenticated(false)
          }
        })
  }

  // sets the user as logged in
  const handleLogin = (employee) => {
    setCurrentEmployee(employee);
    setIsAuthenticated(true);
  }
  
  const renderHomePage = () => {
    // renders the loading animation if the /me fetch hasn't completed yet
    if (isLoaded) {
      // show the homepage if the user is logged in
      if (isAuthenticated) {
        return <HomePage
                  currentEmployee={currentEmployee}
                  isAuthenticated={isAuthenticated}
                />
      // show the login page if no user is logged in
      } else {
        return  <div className='login-required'>  
                  <Login
                    onLogin={handleLogin}
                  />
                  <br /> 
                  <Link to="/signup">Not registered? Click here to create a new user!</Link>
                  <br /> 
                </div>  
      }
      // if the /me fetch has not completed, display the loading animation
    } else {
        return  <div className='loading-gif'>
                  <img src={loadingGif} alt="Loading animation" id="loading"/>
                </div>
      
    }
  }

    return (
      <div className="app">
        <div id="main">
          <div id="top-to-footer">
            <Header
              currentEmployee={currentEmployee}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />
              {/* Renders the loading animation or the homepage */}
              {renderHomePage()}

          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    );
}

export default App;