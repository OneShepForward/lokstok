import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../image/lokstok_cover_photo.png";

// import Pic from "../image/ProfilePicture.png"

function CreateAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const userCreds = { ...formData, admin: true };

    fetch("/create_an_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    })
      .then((r) => r.json())
      .then((employee) => {
        console.log(employee);
        setFormData({
          name: "",
          password: "",
          position: ""
        });
      });
  }

  return (
    <>
    <img src={logo} alt="LokStok Logo"/>
      <h1>CreateAdmin Here!</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">name: </label> */}
        <input
          id="name-CreateAdmin-input"
          type="text"
          placeholder='Username...'
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
        <br />
        {/* <label htmlFor="position">Position: </label> */}
        <input
          id="position-CreateAdmin-input"
          type="text"
          placeholder='Position...'
          name="position"
          value={formData.position}
          onChange={handleChange}
          />
        <br />
        {/* <label htmlFor="password">Password: </label> */}
        <input
          id="password-CreateAdmin-input"
          type="password"
          placeholder='Password...'
          name="password"
          value={formData.password}
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

export default CreateAdmin;
