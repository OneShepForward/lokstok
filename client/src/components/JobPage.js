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

  useEffect(() => {
    fetch(`/jobs/${params.jobId}`).then((res) => {
      if (res.ok) {
        res.json().then((jobs) => {
          console(jobs)
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
       <h2>The JobPage</h2>
      <Footer />
    </div>
  );
}

export default JobPage;
