import './style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';



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
          setLoaded(true);
        });
      }
    });
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
        <div>

        </div>
      );
    }
}

export default App;