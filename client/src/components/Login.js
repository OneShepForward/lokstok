import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo from "../image/lokstok_cover_photo.png";

// import Pic from "../image/ProfilePicture.png"

function Login({onLogin}) {
 
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
            onLogin(employee);
            setErrorState(null);
            setFormData({
              name: "",
              password: "",
            });
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


//   return (
//     <div className="login">
      
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input
//           type="text"
//           id="username"
//           placeholder='Username'
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br/>
//         <input
//           type="password"
//           id="password"
//           placeholder='Password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br/>
//         {errorState ? <p class="error">{errorState.error}</p> : null}
//         <br/>
//         <Button type="submit" variant="contained">Login</Button>
//       </form>
//     </div>
//   );
// }

return (
  <>
    <img src={logo} alt="LokStok Logo"/>
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
      <br />
      <Button type="submit" variant="contained">Login</Button>
    </form>
    <Link to="/" replace>
      Have an account already? Log in!
    </Link>
  </>
);
};

export default Login;
