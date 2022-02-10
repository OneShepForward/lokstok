import '../style/App.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';



function Login({onLogin}) {

  let navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [errorState, setErrorState] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
      e.preventDefault();

      const userCreds = { ...formData };

      fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
      }).then((r) => {
        if (r.ok) {
          r.json().then((employee) => {
            console.log(employee)
            setErrorState(null);
            onLogin(employee);
            setFormData({
              name: "",
              password: "",
            });
            navigate(`/home`);
          });
        }
        else {
          r.json().then((errors) => {
            console.log(errors);
            setErrorState(errors);
          });
        }
      });
    }


return (
  <div className='Login'>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      {/* <label htmlFor="name">name: </label> */}
      <input
        id="username-signup-input"
        type="text"
        placeholder='Username...'
        name="name"
        value={formData.name}
        onChange={handleChange}
        />
      <br />
      {/* <label htmlFor="position">Position: </label>
      <input
        id="position-signup-input"
        type="text"
        placeholder='Position...'
        name="position"
        value={formData.position}
        onChange={handleChange}
        />
      <br /> */}
      {/* <label htmlFor="password">Password: </label> */}
      <input
        id="password-signup-input"
        type="password"
        placeholder='Password...'
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <br /><br />
      {errorState ? <p className="error">{errorState.errors}</p> : <br />}
      <Button type="submit" variant="contained">Login</Button>
    </form>
  </div>
);
};

export default Login;
