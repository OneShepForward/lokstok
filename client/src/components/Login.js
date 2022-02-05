import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo from "../image/lokstok_cover_photo.png";

// import Pic from "../image/ProfilePicture.png"

function Login() {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(null)

  function handleSubmit(e) {
      e.preventDefault();
      fetch(`/login_the_user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username,
          password,
       }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            // onLogin(user);
            setErrorState(null);
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
    <div className="login">
      <img src={logo} alt="LokStok Logo"/>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          id="username"
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
          type="password"
          id="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        {errorState ? <p class="error">{errorState.error}</p> : null}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
