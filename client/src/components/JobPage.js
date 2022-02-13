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

  useEffect(() => {
    fetch(`/jobs/${params.jobId}`).then((res) => {
      if (res.ok) {
        res.json().then((job) => {
          console.log(job)
          setCurrentJob(job)
        });
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

  const renderItems = currentJob.items.map((item) => {
    return <p 
    key = {item.id}
    >{item.id}</p>
  })

  // {id: 1, name: 'Fix the leak', job_is_active: true, client: {…}, employee: {…}, …}
  // client: {id: 1, name: 'Archstone Apartments', phone: '281-555-4156'}
  // employee: {id: 1, name: 'Kilgore Trout', position: 'plumber', admin: true}
  // id: 1
  // items: Array(3)
  // 0: {id: 1, bin: '1', active: true}
  // 1: {id: 2, bin: '9', active: true}
  // 2: {id: 3, bin: '10', active: true}
  // length: 3
  // [[Prototype]]: Array(0)
  // job_is_active: true
  // name: "Fix the leak"
  // [[Prototype]]: Object

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
          <ul>{renderItems}</ul>

          
        </div> 
          : <p>Loading...</p>
        }
      <Footer />
    </div>
  );
}

export default JobPage;
