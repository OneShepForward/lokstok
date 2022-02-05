import './App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import Pic from "../image/ProfilePicture.png"

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  
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
    </div>
  );
}

export default App;
