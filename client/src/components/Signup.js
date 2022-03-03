import '../style/App.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

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

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const goHome = () => {
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
      r.json().then(() => {
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
        setErrorState(errors);
        setFormData({
          password: "",
          passwordConfirmation: "",
        });
      });
    }
  })
}

const renderErrors = () => {
  return errorState.error.map((error) => {
    return <>
      <p className='error' key={Math.random()}>{error}</p>
    </>
  })
}

console.log("errorState: ", errorState)

  return (
  <div className='signup'>
    <div id="top-to-footer">
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
            autoFocus
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
          <br />
        {errorState ? renderErrors() : <br />}
          <Button type="submit" variant="contained">Sign up</Button>
        </form>
        <br/>
        <Link to="/home" replace>
          Have an account already? Log in!
        </Link>
      </div>
        <Footer />
    </div>
  );
};

export default Signup;
