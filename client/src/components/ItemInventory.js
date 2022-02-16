import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';


function ItemInventory() {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  const [currentItems, setCurrentItems] = useState([])

  useEffect(() => {
    fetch(`/items`).then((res) => {
      if (res.ok) {
        res.json().then((items) => {
          setCurrentItems(items);
          })  
      }
    });

  }, []);

  const renderItems = currentItems.map((item) => {
    prices.push(item.part.price)
    return <p 
    key = {item.id}
    >{item.part.description}, price: ${item.part.price}</p>
  })


  return (
    <div className="ItemInventory">
      <Header currentEmployee={logged_in} />
       {currentJob ? 
        <div className="job-details">
          <h1> Job details </h1>
          <h2>{currentJob.name}</h2>
          <h2>Client: {currentJob.client.name}</h2> 
          <h3>Phone Number: {currentJob.client.phone}</h3> 
          <br/>
          <h2>Parts assigned to this job:</h2>
          {currentItems ? 
            <div className='item-list'> <div>{renderItems}</div> 
            <p><b> Total cost of items: <i>${totalPrice}</i></b></p></div>
            
            : <p>Loading...</p>}          
        </div> 
          : <p>Loading...</p>
        }
      <Footer />
    </div>
  );
}

export default ItemInventory;
