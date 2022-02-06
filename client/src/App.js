import './style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Login from "./components/Login";
import Employees from "./components/Employees";


// import Pic from "../image/ProfilePicture.png"

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
          }
        })
  }
  
  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/parts">Parts</Link> |{" "}
        <Link to="/employees">Employees</Link>
      </nav>
      {currentEmployee ? <h2><i>Welcome, {currentEmployee.name}!</i></h2> : <h2></h2>}
      <Login
        onLogin={setCurrentEmployee}
      />
      <br /> 
        <Link to="/signup">Not registered? Click here to create a new user!</Link>
      <br />  
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default App;
