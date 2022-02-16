import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import QRCode from 'qrcode.react';


function ItemCreate({  }) {
  
  // imports currentEmployee state from Header
  let location = useLocation();
  const { logged_in } = location.state; 
  let navigate = useNavigate();

  const [partList, setPartList] = useState([]);
  const [currentPart, setPart] = useState(null);

  const [errorState, setErrorState] = useState(null);

  const quantityList = [1,2,3,4,5,6,7,8,9,10,11,12]
  const [currentQuantity, setQuantity] = useState(null);

  const binList = [1,2,3,4,5,6,7,8,9,10,11,12]
  const [currentBin, setBin] = useState(null);

  const [formData, setFormData] = useState({
    quantity: "",
    bin: "",
    part_id: null,
  });

  useEffect(() => {
    fetch("/parts").then((res) => {
      if (res.ok) {
        res.json().then((parts) => {
          setPartList(parts)
        });
      }
    });

  }, []);

  // const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  // };

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: formData.quantity,
        bin: formData.bin,
        part_id: formData.part_id,
        job_is_active: true,
      }),
    }).then((r) => {
      if (r.ok) {
      r.json().then((job) => {
        console.log("job created: ", job);
        setFormData({
          quantity: 0,
          bin: null,
          part_id: null,
        });
        setPart(null)
        setErrorState(null);
      });
    } else {
      r.json().then((errors) => {
        console.log(errors);
        setErrorState(errors);
        setFormData({
          quantity: 0,
          bin: null,
          part_id: null,
        });
      });
    }
  })
}

// -- PART MENU
const [anchorEl, setAnchorEl] = useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleSelectPart = (choice) => {
  setAnchorEl(null);
  // Prevents clicking outside menu from updating state
  choice.id ? handlePartChange(choice) : setPart(null)
};

const partMenu = partList.map((part) => {
  return <MenuItem 
  onClick={() => handleSelectPart(part)}
  key = {part.id}
  >Part #{part.id} -<>&nbsp;</> <b>{part.description}</b><>&nbsp;</> - <>&nbsp;</>{part.manufacturer}</MenuItem>
})

  const handlePartChange = (part) => {
    setPart(part);
    setFormData({
      ...formData,
      part_id: part.id
    })
  }
// --

// -- DROPDOWN QUANTITY MENU
const [anchorQuantityEl, setAnchorQuantityEl] = useState(null);
const quantityOpen = Boolean(anchorQuantityEl);

const handleQuantityClick = (event) => {
  setAnchorQuantityEl(event.currentTarget);
};

const handleSelectQuantity = (choice) => {
  setAnchorQuantityEl(null);
  
  // Prevents clicking outside menu from updating state
  Number.isInteger(choice) ? handleQuantityChange(choice) : setQuantity(null)
};

const handleQuantityChange = (quantity) => {
  setQuantity(quantity);
  setFormData({
    ...formData,
    quantity: quantity
  })
}

  const quantityMenu = quantityList.map((quantity) => {
    return <MenuItem 
    onClick={() => handleSelectQuantity(quantity)}
    key = {quantity}
    >{quantity}</MenuItem>
  })
// --

// -- DROPDOWN BIN MENU
const [anchorBinEl, setAnchorBinEl] = useState(null);
const binOpen = Boolean(anchorBinEl);

const handleBinClick = (event) => {
  setAnchorBinEl(event.currentTarget);
};

const handleSelectBin = (choice) => {
  setAnchorBinEl(null);
  
  // Prevents clicking outside menu from updating state
  Number.isInteger(choice) ? handleBinChange(choice) : setBin(null)
};

const handleBinChange = (bin) => {
  setBin(bin);
  setFormData({
    ...formData,
    bin: bin
  })
}

  const binMenu = binList.map((bin) => {
    return <MenuItem 
    onClick={() => handleSelectBin(bin)}
    key = {bin}
    >{bin}</MenuItem>
  })
// --

console.log(formData)

  return (
    <div className="ItemCreate">
      <Header currentEmployee={logged_in}/>
      <h2>Add Items to Inventory</h2>

      {/* Parts dropdown menu */}
      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Select a Part
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelectPart}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        {partMenu}
      </Menu>
      {currentPart ? 
        <h3 className='selection-made'> Part selected: {currentPart.description},<>&nbsp;</> 
        {currentPart.manufacturer} </h3> :
        <h3></h3>}
      <br/>

      <Button
        id="basic-button"
        variant="outlined"
        name="quantity"
        aria-controls={quantityOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={quantityOpen ? 'true' : undefined}
        onClick={handleQuantityClick}
      >
        Select Quantity
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorQuantityEl}
        open={quantityOpen}
        onClose={handleSelectQuantity}
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
        {quantityMenu}
      </Menu>
      {currentQuantity ? 
        <h3 className='selection-made'> Quantity selected: {currentQuantity}</h3> :
        <h3></h3>}
      <br/>

      <Button
        id="basic-button"
        variant="outlined"
        name="bin"
        aria-controls={binOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={binOpen ? 'true' : undefined}
        onClick={handleBinClick}
      >
        Select Bin
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorBinEl}
        open={binOpen}
        onClose={handleSelectBin}
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
        {binMenu}
      </Menu>
      {currentBin ? 
        <h3 className='selection-made'> Bin selected: {currentBin}</h3> :
        <h3></h3>}
{/*       
        <label>Quantity: </label>
        <input
        id="quantity-itemform-input"
        type="text"
        placeholder='Quantity...'
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        />
        <br />
      <br /> */}

              
      {errorState ? <p className="error">{errorState.error}</p> : <br />}
        
      {currentBin && currentQuantity && currentPart ? <Button type="submit" variant="contained">Add Shipment</Button> :
      <p><i>Select part, quantity, and bin to add shipment...</i></p>}
      <Footer />
    </div>
  );
}

export default ItemCreate;
