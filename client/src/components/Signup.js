import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';

import Button from '@mui/material/Button';


function Signup() {
  let navigate = useNavigate();
  const [errorState, setErrorState] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    password: "",
    passwordConfirmation: "",
  });
  let passwordConfirmation

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  // This won't navigate... why?
  const goHome = () => {
    console.log("Headed home")
    navigate(`/home`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        name: formData.name,
        position: formData.position,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation
      }),
    }).then((r) => {
      if (r.ok) {
      r.json().then((employee) => {
        console.log(employee, "signed up!");
        setFormData({
          name: "",
          position: "",
          password: "",
          passwordConfirmation: "",
        });
        setErrorState(null);
        // navigate to HomePage
        goHome();
      });
    } else {
      r.json().then((errors) => {
        console.log(errors);
        setErrorState(errors);
        setFormData({
          name: "",
          position: "",
          password: "",
          passwordConfirmation: "",
        });
      });
    }
  })
}

  //     .then((r) => r.json())
  //     .then((employee) => {
  //       console.log(employee);
  //       setFormData({
  //         name: "",
  //         password: "",
  //         position: "",
  //         passwordConfirmation: "",
  //       });
  //     });
  // }

  return (
  <div className='Signup'>
    <Header />
      <h1>Signup Here!</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="name-signup-input"
          type="text"
          placeholder='Username...'
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
        <br />
        <input
          id="position-signup-input"
          type="text"
          placeholder='Position...'
          name="position"
          value={formData.position}
          onChange={handleChange}
          />
        <br />
        <input
          id="password-signup-input"
          type="password"
          placeholder='Password...'
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          id="password-confirmation-signup-input"
          type="password"
          placeholder='Confirm Password...'
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
        <br /><br />
      {errorState ? <p className="error">{errorState.error}</p> : <br />}
        <Button type="submit" variant="contained">Sign up</Button>
      </form>
      <Link to="/home" replace>
        Have an account already? Log in!
      </Link>
    </div>
  );
};

export default Signup;
