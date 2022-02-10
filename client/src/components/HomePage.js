import '../style/App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function HomePage({currentEmployee}) {

  return (
    <div className="HomePage">
      <div className='column-1'>
        <h2>Active Jobs</h2>
      </div>
      <div className='column-2'>
        <Button type="submit" variant="contained">Create Job</Button>
      </div>
      <div className='column-3'>
        <Link to="/get_parts"
          state={{ logged_in: currentEmployee }}
        >Get Parts</Link>
      </div>
    </div>
  );
}

export default HomePage;
