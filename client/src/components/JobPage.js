import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';


function JobPage() {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  // useParams
  const params = useParams();

  const [currentJob, setCurrentJob] = useState(null)
  const [currentItems, setCurrentItems] = useState([])

  useEffect(() => {
    fetch(`/jobs/${params.jobId}`).then((res) => {
      if (res.ok) {
        res.json().then((job) => {
          console.log("The job is: ", job);
          setCurrentJob(job);
          setCurrentItems(job.items);
          })
        
        
      }
    });

    // fetch("/items").then((res) => {
    //   if (res.ok) {
    //     res.json().then((items) => {
    //       setItemList(items)
    //     });
    //   }
    // });

  }, []);

  const renderItems = currentItems.map((item) => {
    return <p 
    key = {item.id}
    >{item.part.description}, price: ${item.part.price}</p>
  })

  return (
    <div className="JobPage">
      <Header currentEmployee={logged_in} />
       {currentJob ? 
        <div className="job-details">
          <h1> Job details </h1>
          <h2>{currentJob.name}</h2>
          <h2>Client: {currentJob.client.name}</h2> 
          <h2>Phone Number: {currentJob.client.phone}</h2> 
          <br/>
          <h2>Parts assigned to the job:</h2>
          {currentItems ? <ul>{renderItems}</ul> : <p>Loading...</p>}

          
        </div> 
          : <p>Loading...</p>
        }
      <Footer />
    </div>
  );
}

export default JobPage;
