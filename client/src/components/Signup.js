import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../image/lokstok_cover_photo.png";

// import Pic from "../image/ProfilePicture.png"

function Signup() {
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
  // const handleChange = (e) => {
  //   if (e.target.name === passwordConfirmation) {
  //     setFormData({
  //       ...formData,
  //       password_confirmation: e.target.value,
  //     });
  // }
  //   else {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  // }
  // };

  function handleSubmit(e) {
    e.preventDefault();

    // const userCreds = { 
    //   ...formData,
    //   password_confirmation: passwordConfirmation
    // };

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
    })
      .then((r) => r.json())
      .then((employee) => {
        console.log(employee);
        setFormData({
          name: "",
          password: "",
          position: "",
          passwordConfirmation: "",
        });
      });
  }

  return (
    <>
    <img src={logo} alt="LokStok Logo"/>
      <h1>Signup Here!</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">name: </label> */}
        <input
          id="name-signup-input"
          type="text"
          placeholder='Username...'
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
        <br />
        {/* <label htmlFor="position">Position: </label> */}
        <input
          id="position-signup-input"
          type="text"
          placeholder='Position...'
          name="position"
          value={formData.position}
          onChange={handleChange}
          />
        <br />
        {/* <label htmlFor="password">Password: </label> */}
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
        <button type="submit">Submit</button>
      </form>
      <Link to="/" replace>
        Have an account already? Log in!
      </Link>
    </>
  );
};

export default Signup;
