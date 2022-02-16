import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

function HomePage({currentEmployee}) {
  const [activeJobs, setActiveJobs] = useState([]);

  useEffect(() => {
    fetch("/active_jobs").then((res) => {
      if (res.ok) {
        res.json().then((jobs) => {
            console.log(jobs);
            setActiveJobs(jobs);
        });
      }
    });
  }, []);

  // const renderJobs = activeJobs.map((job => {
  //   return (    
  //   <div 
  //     className='active-job'
  //     key={job.id}
  //   > · Job: <b>{job.name}</b>
  //   <br/> 
  //   </div>)
  // }))

  const renderJobs = activeJobs.map((job => {
    return (    
    <div 
      className='active-job'
      key={job.id}
    >
      <Link to={`/jobs/${job.id}`}
        state={{ logged_in: currentEmployee }}
      >·<b>{job.name}</b></Link>
    </div>)
  }))

  console.log(renderJobs)

  return (
    <div className="HomePage">
      <div className='hp-columns'>
        <div className='column-1'>
          <h2 style={{ marginTop: 0 }}>Active Jobs</h2>
          {activeJobs ? <div>{renderJobs}</div> : <p>No jobs assigned.</p>}
        </div>
        <div className='column-2'>
          <Button 
            component={Link}
            variant="outlined"
            to="/new_job"
            state={{ logged_in: currentEmployee }}
            style={{ 
              width: "7em",
              maxWidth: "100%",
              fontSize: "x-large",
              fontWeight: "bold",
              lineHeight: "1",
              marginBottom: "1em"
          }}
          >Create Job</Button>
          <br/>          
          <Button 
            component={Link}
            variant="outlined"
            to="/get_parts"
            state={{ logged_in: currentEmployee }}
            style={{ 
              width: "7em",
              maxWidth: "100%",
              fontSize: "x-large",
              fontWeight: "bold",
              lineHeight: "1",
              marginBottom: "1em"
          }}
          >Get Parts</Button>
        </div>
        {/* <div className='column-3'>

        </div> */}
      </div>
    </div>
  );
}

export default HomePage;
