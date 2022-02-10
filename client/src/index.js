import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom"; 
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Employees from './components/Employees';
import Parts from './components/Parts';
import Signup from './components/Signup';
import CreateAdmin from './components/CreateAdmin';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="employees" element={<Employees />} />
        <Route path="parts" element={<Parts />} />
        <Route path="signup" element={<Signup />} />
        <Route path="create_admin" element={<CreateAdmin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
