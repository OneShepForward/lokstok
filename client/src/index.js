import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom"; 
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App';
import Employees from './components/Employees';
import Parts from './components/Parts';
import Signup from './components/Signup';
import ItemCreate from './components/ItemCreate';
import ItemGet from './components/ItemGet';
import ItemInventory from './components/ItemInventory';
import JobForm from './components/JobForm';
import JobPage from './components/JobPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="home" element={<App />} />
        <Route path="signup" element={<Signup />} />
        <Route path="create_item" element={<ItemCreate />} />
        <Route path="get_parts" element={<ItemGet />} />
        <Route path="inventory" element={<ItemInventory />} />
        <Route path="employees" element={<Employees />} />
        <Route path="parts" element={<Parts />} />
        <Route path="new_job" element={<JobForm />} />
        <Route path="jobs/:jobId" element={<JobPage />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
