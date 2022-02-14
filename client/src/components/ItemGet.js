import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import { v4 as uuidv4 } from 'uuid';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function ItemGet({}) {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  const [itemList, setItemList] = useState([]);
  const [currentItem, setItem] = useState(null);

  const [jobList, setJobList] = useState([]);
  const [currentJob, setJob] = useState(null);

  const [itemCart, setItemCart] = useState([]);

  const [assignedComplete, setAssignedComplete] = useState(false);

  const [itemsAssigned, setItemsAssigned] = useState([]);

  const [itemsFailed, setItemsFailed] = useState([]);
  const [errorItemFailed, setErrorItemFailed] = useState(false);
  


    useEffect(() => {
      fetch("/jobs").then((res) => {
        if (res.ok) {
          res.json().then((jobs) => {
            setJobList(jobs)
          });
        }
      });
  
      fetch("/items").then((res) => {
        if (res.ok) {
          res.json().then((items) => {
            setItemList(items)
          });
        }
      });
    }, []);

      // JOB MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelectJob = (choice) => {
    setAnchorEl(null);
    // Prevents clicking outside menu from updating state
    choice.id ? setJob(choice) : setJob(null)
  };
  
    const jobMenu = jobList.map((job) => {
      return <MenuItem 
      onClick={() => handleSelectJob(job)}
      key = {job.id}
      >Job {job.id}: {job.name}</MenuItem>
    })
  
     // ITEM MENU
  const [anchorItemEl, setAnchorItemEl] = useState(null);
  const itemOpen = Boolean(anchorItemEl);
  const handleItemClick = (event) => {
    setAnchorItemEl(event.currentTarget);
  };
  const handleSelectItem = (choice) => {
    setAnchorItemEl(null);
    // Prevents clicking outside menu from updating state
    choice.id ? setItem(choice) : setItem(null)
  };
  
    const itemMenu = itemList.map((item) => {
      return <MenuItem 
      onClick={() => handleSelectItem(item)}
      key = {item.id}
      >Part {item.id}: {item.name}</MenuItem>
    })

  // console.log("Item Cart ", itemCart)

      // ITEM CART
  const handleAddItemToCart = () => {
    setItemsAssigned([]);
    setAssignedComplete(false);
    setItemsFailed([]);
    setErrorItemFailed(false);

    setItemCart([
      ...itemCart,
      {item_id: currentItem.id,
      job_id: currentJob.id}
    ]);
    setItem(null);
  }


  const displayCart = itemCart.map((item) => {
    return (
    <li className='cart-item'
        key={item.item_id}
    >· Item: {item.item_id}
    <br/> 
    {/* Add a way to remove item from the cart */}
    </li>)
  })

  // we'll work on this some more after I get the db sorted.
  const handleAssignItems = () => {
    console.log("send", itemCart, "to post");
    itemCart.forEach((itemJob) => {
      fetch("/create_item_job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_id: itemJob.item_id,
          job_id: itemJob.job_id,
          employee_id: logged_in.id
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((item) => {
            console.log("reached r.ok condition with", item)
          })
        } else {
          r.json().then((item) => {
          console.log("Hit the r.not.ok else", item)
          handleFailedItem(item)
        })
        }
      }
    )
  });
  handleSuccess()
}

const handleSuccess = () => {
  fetch(`/jobs/${currentJob.id}`)
  .then((res) => res.json())
  .then((job) => {
        console.log("These items assigned to job: ", job.items);
        setItemsAssigned(job.items);
        setAssignedComplete(true);
        })   
  }

const handleFailedItem = (error) => {
  console.log("Failed item: ", error.error);
  setErrorItemFailed(true);
  setItemsFailed(error);
  // setItemsFailed([
  //   ...itemsFailed,
  //   error
  // ])
}

const displaySuccess = itemsAssigned.map((item) => {
  return <p key={item.id}>{item.part.description} assigned to {currentJob.name}<br/></p>
})

// const renderFailedItems = itemsFailed.map((error) => {
//   // return <p key={uuidv4()} className="error">{error.error}</p>
//   console.log(error);
// })

const renderFailedItems = <p>failure presenet</p>


console.log("Assigned items: ", itemsAssigned)
console.log("errorItemFailed: ", errorItemFailed)
console.log("itemsFailed: ", itemsFailed)

// const displaySuccess = "Assigned successfully"
  
  
  return (
    <div className="ItemGet">
      <Header currentEmployee={logged_in} />
      <h1>Add a part to a job</h1>
      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Select Job
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelectJob}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        {jobMenu}
      </Menu>
      {currentJob ? 
        <h3> Job selected: {currentJob.name} </h3> :
        <h3> Select a job to add parts to</h3>}
      <br/>

      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={itemOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={itemOpen ? 'true' : undefined}
        onClick={handleItemClick}
      >
        Select Item
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorItemEl}
        open={itemOpen}
        onClose={handleSelectItem}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            maxHeight: '20ch',
            width: '50ch',
          },
        }}
      >
        {itemMenu}
      </Menu>

      {currentItem ? 
        <h3> Part selected: {currentItem.id} </h3> :
        <h3> Select a Part to add </h3>}
      {currentItem && currentJob ?
        <Button 
        type="submit" 
        variant="contained"
        onClick={handleAddItemToCart}
        >Add part to cart</Button> :
        <br/> }

      {itemCart.length ? 
        <>
        <ul id="item-cart"> 
          {displayCart}
        </ul> 
        <br/>
        <Button 
        type="submit" 
        variant="contained"
        onClick={handleAssignItems}
        >Assign items to job: {currentJob.name}</Button>        
        </> :
        <br/> }
{/* 
      {assignedComplete ?
        (<><p>Items</p> <ul>{displaySuccess}</ul> <p>added successfully</p> </>) :
        <h3>No items assigned yet</h3>
      } */}

      {assignedComplete ?
        (<><ul>{displaySuccess}</ul> </>) :
        <h3>No items assigned yet</h3>
      }

      {errorItemFailed && (itemsFailed.length > 0) ? {renderFailedItems} : <></>}



        {/* Need to make cards stay inside of box -- Float? */}
        
      {/* {itemCart.length ? 
        <>
        <Box id="item-cart"
        sx={{
          marginLeft: 50,
          width: 900,
          height: 300,
          border: 2,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}> {displayCart}
        </Box> 
        <br/>
        </> :
        <br/> } */}

      
        <Footer />
    </div>
  );
}

export default ItemGet;
