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

  
  return (
    <div className="JobPage">
      <Header currentEmployee={logged_in} />
       {currentJob ? <h2>Job: {currentJob.name}</h2>: <p>Loading...</p>}
      <Footer />
    </div>
  );
}

export default JobPage;
