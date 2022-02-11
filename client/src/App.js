import './style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Login from "./components/Login";
import Employees from "./components/Employees";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((employee) => {
          setCurrentEmployee(employee);
          setIsAuthenticated(true);
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
  
  return (
    <div className="App">

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
    <Footer />
    </div>
  );
}

export default App;

{/* <Link to="/parts">Parts</Link> |{" "}
<Link to="/employees">Employees</Link> */}