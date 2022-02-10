import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from './Header';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';

function ItemGet({}) {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  const [itemList, setItemList] = useState([]);
  const [currentItem, setItem] = useState(null);

  const [jobList, setJobList] = useState([]);
  const [currentJob, setJob] = useState(null);

  const [itemCart, setItemCart] = useState([]);
  
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

  // Dropdown Job menu
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
  
  // Dropdown Item menu
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

  console.log("Item Cart ", itemCart)

  const handleAddItemToCart = () => {
    let cartArray = [...itemCart]
    setItemCart([
      ...cartArray,
      {item_id: currentItem.id,
      job_id: currentJob.id}
    ]);
    setItem(null);
    setJob(null);
  }

  const jobMenu = jobList.map((job) => {
    return <MenuItem 
    onClick={() => handleSelectJob(job)}
    key = {job.id}
    >Job {job.id}: {job.name}</MenuItem>
  })

  const itemMenu = itemList.map((item) => {
    return <MenuItem 
    onClick={() => handleSelectItem(item)}
    key = {item.id}
    >Part {item.id}: {item.name}</MenuItem>
  })
  
  return (
    <div className="ItemGet">
      <Header currentEmployee={logged_in} />
      <h2>Add a part to a job</h2>
      <Button
        id="basic-button"
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
        <h3> Select a job to add parts </h3>}
      <br/>

      <Button
        id="basic-button"
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
        <h3> Select a Part to add parts </h3>}
      {currentItem && currentJob ?
        <Button 
        type="submit" 
        variant="contained"
        onClick={handleAddItemToCart}
        >Add parts to cart</Button> :
        <br/> }

      {itemCart.length ? 
        <Box id="item-cart"
        sx={{
          marginLeft: 50,
          width: 900,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        /> :
        <br/> }

      

    </div>
  );
}

export default ItemGet;
