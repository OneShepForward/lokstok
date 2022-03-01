import '../style/App.css';
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import { v4 as uuidv4 } from 'uuid';
import { QrReader } from 'react-qr-reader';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import success from '../audio/success.mp3';

// I plan to use these components to make ItemCards instead of a list of items
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';


function ItemGet() {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;
  // list of jobs and items
  const [jobList, setJobList] = useState([]);
  const [itemList, setItemList] = useState([]);
  // selected job and selected item
  const [currentJob, setJob] = useState(null);
  const [currentItem, setItem] = useState(null);
  // Item cart
  const [itemCart, setItemCart] = useState([]);
  // state when assignment has been completed
  const [assignedComplete, setAssignedComplete] = useState(false);
  // items that have been assigned to a job
  const [itemsAssigned, setItemsAssigned] = useState([]);
  // state if items have failed and which ones
  const [errorItemFailed, setErrorItemFailed] = useState(false);
  const [errorList, setErrors] = useState([]);
  // state whether scanner is displayed
  const [showQR, setShowQR] = useState(false);
  // the QR scanner stores what it scans as result
  // const [data, setData] = useState('No result');

  // -- QR READER -- //
  // This portion scrolls the view window down when scanner selected
  const qrScannerRef = useRef(null)
  const scrollToQrScanner = () => {
    qrScannerRef.current?.scrollIntoView( { behavior: "smooth" })
  }

      
    const handleClickQR = () => {
      setShowQR(!showQR);
      scrollToQrScanner();
    }

    function handleScan(code) {
      if (code) {
        fetch(`${code}`).then((res) => {
          if (res.ok) {
            res.json().then((items) => {
              setItem(items);
              new Audio(success).play();
            });
          } else {
            res.json().then((err) => {
              setErrors([err])
            });
          }
        });
      }
    }
// -- //
  

// -- FETCH
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
// -- //

// -- DROPDOWN JOB MENU
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
    

// -- DROPDOWN ITEM MENU
    const [anchorItemEl, setAnchorItemEl] = useState(null);
    const itemOpen = Boolean(anchorItemEl);
    const handleItemClick = (event) => {
      setAnchorItemEl(event.currentTarget);
    };
    
    const handleSelectItem = (choice) => {
      setAnchorItemEl(null);
      
      setItemsAssigned([]);
      setAssignedComplete(false);
      setErrors([]);
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
      itemCart.forEach((itemJob) => {
        fetch("/create_item_job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_id: itemJob.item_id,
            job_id: itemJob.job_id,
            employee_id: logged_in.id,
            active: false
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then(() => {
            })
          } else {
            r.json().then((item) => {
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
        setItemsAssigned(job.items);
        setAssignedComplete(true);
        })   
  }

const handleFailedItem = (error) => {
  setErrorItemFailed(true);
  setErrors(error.error);
}

const displaySuccess = itemsAssigned.map((item) => {
  return <p key={item.id} className="selection-made">{item.part.description}<br/></p>
})

const renderFailedItems = errorList.map((error) => {
  return <p key={uuidv4()} className="error">Error: {error}</p>
})

const qrScannerButton = (text) => {
    return <Button 
    type="submit" 
    variant="outlined"
    onClick={handleClickQR}
    style={{marginBottom: "0.5em", marginLeft: "0.5em", marginRight:"0.5em" }}
    >{text}</Button>
  }

const selectPartManuallyButton = () => {
    return <Button
    id="basic-button"
    variant="outlined"
    aria-controls={itemOpen ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={itemOpen ? 'true' : undefined}
    onClick={handleItemClick}
    style={{marginBottom: "0.5em", marginLeft: "0.5em", marginRight:"0.5em" }}
  >
    Select Part Manually<ArrowDropDownIcon/>
  </Button>
}

const renderItemSelection = () => {
  if (!showQR && !currentItem) {
    return <div id="item-selection">
    {qrScannerButton("Use QR Scanner")}
    {selectPartManuallyButton()}
    </div>
  } else if (showQR && currentItem) {
    return <div id="item-selection">
    {qrScannerButton("Rescan")}
    {selectPartManuallyButton()}
    </div>
  } else {
    return <div 
          className='qr-scanner'
          >
        {qrScannerButton("Turn off scanner")}
        {selectPartManuallyButton()}
        <QrReader
          constraints={{ facingMode: "environment" }}
          scanDelay="500"
          onResult={(result, error) => {
            if (!!result) {
              // setData(result?.text);
              handleScan(result?.text);
            }
  
            if (!!error) {
              // console.info(error);
            }
          }}
          videoContainerStyle={{width: "10%", padding: "35%", marginLeft: "auto", marginRight: "auto"}}
          videoStyle={{ width: '100%'}}
        />
        {currentItem ? <p>{currentItem.part.description} selected</p> : <p>Scan QR Code for the part...</p>}
        </div>
  }
}

  return (
    <div className="itemGet">
      <div id="top-to-footer">
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
            Select Job<ArrowDropDownIcon/>
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
            <h3 className='selection-made'> Part selected: #{currentItem.id} - {currentItem.part.description} </h3> :
            <h3> Select a Part to add... </h3>}

{/* Item Selection Rendering */}
      {renderItemSelection()}

      
        <br/><br/>
        

        


        {currentItem && currentJob ?
          <Button 
          type="submit" 
          variant="contained"
          onClick={() => handleAddItemToCart(currentItem, currentJob)}
          >Add &nbsp;<b><i> {currentItem.part.description} &nbsp; </i></b> to cart</Button> :
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
        
        <br/>
        {errorItemFailed ? <div>{renderFailedItems}</div> : <div className='failed-items'></div>}
          
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
        <div ref={qrScannerRef}></div>
      </div>  
        <Footer />
    </div>
  );
}

export default ItemGet;
