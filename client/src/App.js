import './style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

import logo from "./image/lokstok_cover_photo.png";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const [isLoaded, setLoaded] = useState(false)

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
        }, 1800);

        //cleanup function 
        return function cleanup() {
            console.log("Running cleanup");
            // ✅ clear the interval so state is no longer updated
            clearInterval(timer);
            };
        // -- ^^ To prevent coded in load time, comment out this block of code ^^

  }, []);

  const handleLogout = () => {
    fetch('/logout', {method: "DELETE"})
    .then(res => {
          if (res.ok) {
            setCurrentEmployee(null)
            setIsAuthenticated(false)
          }
        })
  }

  const handleLogin = (employee) => {
    setCurrentEmployee(employee);
    setIsAuthenticated(true);
  }
  
  if (isLoaded) {
    return (
      <div className="app">
        <div id="main">
          <div id="top-to-footer">
            <Header
              currentEmployee={currentEmployee}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            />

            { 
            isAuthenticated ? 
              (
                <HomePage
                  currentEmployee={currentEmployee}
                  isAuthenticated={isAuthenticated}
                />
              )
              :
              (
              <div className='login-required'>  
                <Login
                  onLogin={handleLogin}
                />
                <br /> 
                <Link to="/signup">Not registered? Click here to create a new user!</Link>
                <br /> 
              </div>   
              )
              }
          </div>
          <div >
            <Footer />
          </div>
        </div>
      </div>
    );
    } else {
      return (
        <div id="load-page">
          <img src={logo} alt="LokStok Logo" className="load-logo"/>
        </div>
      );
    }
}

export default App;