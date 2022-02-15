import '../style/App.css';
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import { v4 as uuidv4 } from 'uuid';
import QrReader from 'react-qr-reader'

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

  const [showQR, setShowQR] = useState(false);

  const qrScannerRef = useRef(null)
  const scrollToQrScanner = () => {
    qrScannerRef.current?.scrollIntoView( { behavior: "smooth" })
  }


// -- QR READER -- //
    const [result, setResult] = useState('No result');
      
    const handleClickQR = () => {
      setShowQR(!showQR)
      scrollToQrScanner();
    }

    function handleScan(data) {
      if (data) {
        setResult(data)
        fetch(`${data}`).then((res) => {
          if (res.ok) {
            res.json().then((items) => {
              setItem(items)
            });
          }
        });
      }
    }
    function handleError(err) {
      console.error(err)
    }
// -- //
  


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

// -- JOB MENU
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
// --
    

// -- ITEM MENU
    const [anchorItemEl, setAnchorItemEl] = useState(null);
    const itemOpen = Boolean(anchorItemEl);
    const handleItemClick = (event) => {
      setAnchorItemEl(event.currentTarget);
    };
    
    const handleSelectItem = (choice) => {
      setAnchorItemEl(null);
      
      setItemsAssigned([]);
      setAssignedComplete(false);
      setItemsFailed([]);
      setErrorItemFailed(false);

      // Prevents clicking outside menu from updating state
      choice.id ? setAndFilterItem(choice) : setItem(null)
    };

    const setAndFilterItem = (item) => {
      setItem(item)
      setItemList([...itemList].filter((i) => i.id !== item.id))
    }
    
      const itemMenu = itemList.map((item) => {
        return <MenuItem 
        onClick={() => handleSelectItem(item)}
        key = {item.id}
        >Item {item.id}: {item.part.description}</MenuItem>
      })
// --


// -- ITEM CART
    const handleAddItemToCart = (item, job) => {
      setItemCart([
        ...itemCart,
        {...item,
        ...job,
        item_id: item.id,
        job_id: job.id}
      ]);
      setItem(null);
    }
    // console.log("itemCart: ", itemCart)
    
    
        const handleRemoveFromCart = (e) => {
          let itemIdToRemove = parseInt(e.target.value)
          setItemCart(
            [...itemCart].filter((i) => {
              return i.item_id !== itemIdToRemove})
            )
        }
    
    const displayCart = itemCart.map((item) => {
      return (
        <div 
        className={item.item_id}
        key={item.item_id}
        ><b>· Item {item.item_id}:</b> {item.part.description}
      <Button 
        value={item.item_id}
        type="submit" 
        variant="default"
        onClick={handleRemoveFromCart}
        >❌</Button> 
      <br/> 
      {/* Add a way to remove item from the cart */}
      </div>)
    })
// --

// -- ASSIGN ITEMS TO JOB
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
      setItemCart([])
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
  setItemsFailed(error.error);
  // setItemsFailed([
  //   ...itemsFailed,
  //   error
  // ])
}

const displaySuccess = itemsAssigned.map((item) => {
  return <p key={item.id}>{item.part.description}<br/></p>
})

const renderFailedItems = itemsFailed.map((error) => {
  return <p key={uuidv4()} className="error">Error: {error}</p>
})

// console.log("Assigned items: ", itemsAssigned)
// console.log("errorItemFailed: ", errorItemFailed)
// console.log("itemsFailed: ", itemsFailed)

console.log(currentItem)
console.log("item cart: ", itemCart)

  
  return (
    <div className="ItemGet">
      <Header currentEmployee={logged_in} />
      <h1>Add a part to a job</h1>
  
      {currentJob ? 
        <h3 className='selection-made'> Job selected: {currentJob.name} </h3> :
        <h3> Select a job to add parts to...</h3>}
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
        <br/>
        <br/>
        <br/>
        {currentItem ? 
          <h3 className='selection-made'> Part selected: {currentItem.id} </h3> :
          <h3> Select a Part to add... </h3>}


      <Button 
        type="submit" 
        variant="outlined"
        onClick={handleClickQR}
        >Use QR Scanner</Button>
      <>&nbsp;&nbsp;&nbsp;&nbsp;</>
      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={itemOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={itemOpen ? 'true' : undefined}
        onClick={handleItemClick}
      >
        Select Part Manually
      </Button>
      <br/><br/>
      
  {/* QR Scanner displayed when the Use QR Scanner button clicked      */}
      {showQR? 
      <div 
        className='qr-scanner'
        >
      <QrReader
        delay={300}
        onError={(err) => handleError(err)}
        onScan={(data) => handleScan(data)}
        style={{ width: '100%' }}
      />
      {currentItem ? <p>{currentItem.part.description} selected</p> : <p>Scan QR Code for the part...</p>}
      </div>
      :
      <></>
      }


      {currentItem && currentJob ?
        <Button 
        type="submit" 
        variant="contained"
        onClick={() => handleAddItemToCart(currentItem, currentJob)}
        >Add part to cart</Button> :
        <br/> }

      {currentItem && !currentJob ?
        <p className='error'>Select a job to add a part!</p> :
        <br/> }

      {itemCart.length && currentJob ? 
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


      {assignedComplete ?
        (<div className='assigned-items'> <br/> <b>Items assigned to <u>{currentJob.name}</u></b>: <br/>
        <div>{displaySuccess}</div> </div>) :
        <p><i>No items assigned yet...</i></p>
      }
      <div ref={qrScannerRef}></div>
      <br/>
      {errorItemFailed ? <div>{renderFailedItems}</div> : <div className='failed-items'></div>}



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
      
        <Footer />
    </div>
  );
}

export default ItemGet;
