import '../style/App.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import ItemSticker from './ItemSticker';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { CSVDownload } from "react-csv";

function ItemCreate() {
  
  // imports currentEmployee state from Header
  let location = useLocation();
  const { logged_in } = location.state; 

  const [partList, setPartList] = useState([]);
  const [currentPart, setPart] = useState(null);

  const [errorState, setErrorState] = useState(null);

  const quantityList = [1,2,3,4,5,6,7,8,9,10,11,12]
  const [currentQuantity, setQuantity] = useState(null);

  const binList = [1,2,3,4,5,6,7,8,9,10,11,12]
  const [currentBin, setBin] = useState(null);

  const [itemsCreated, setItemsCreated] = useState([]);

  const [download, setDownload] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/add_shipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: formData.quantity,
        bin: formData.bin,
        part_id: formData.part_id,
        active: true,
      }),
    }).then((r) => {
      if (r.ok) {
      r.json().then((items) => {
        setItemsCreated(items)
        setFormData({
          quantity: "",
          bin: "",
          part_id: null,
        });
        setPart(null)
        setBin("")
        setQuantity("")
        setErrorState(null);
      });
    } else {
      r.json().then((errors) => {
        setErrorState(errors);
        setFormData({
          quantity: "",
          bin: "",
          part_id: null,
        });
        setPart(null)
        setBin("")
        setQuantity("")
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

const renderSticker = itemsCreated.map((item) => {
  console.log("item: ", item)
  return <ItemSticker
    key={item.id}
    item={item}
  />
})

const [csvData, setCsvData] = useState([
  ["url", "item_id", "part_id", "part_description"]
])

const handleDownload = () => {
  let innerCSV = csvData 
  let data = []
  itemsCreated.map((item) => {
    data = [`/items/${item.id}`, `${item.id}`, `${item.part.id}`, `${item.part.description}`]
    innerCSV.push(data)
  })
  console.log(innerCSV)
  setCsvData(innerCSV)
  checkDownload(innerCSV);
}

let i = 0
const checkDownload = (data) => {
  if (data.length > 1 && data.length > itemsCreated.length) {
    setDownload(true)
  } else if (i > 20) {
    console.error("Download failed")
  } else {
    ++i
    checkDownload(data);
  }

}
  return (
    <div className="itemCreate">
      <div id="top-to-footer">
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
          Select a Part<ArrowDropDownIcon/>
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
          <p></p>}

        <Button
          id="basic-button"
          variant="outlined"
          name="quantity"
          aria-controls={quantityOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={quantityOpen ? 'true' : undefined}
          onClick={handleQuantityClick}
        >
          Select Quantity<ArrowDropDownIcon/>
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
          <p></p>}

        <Button
          id="basic-button"
          variant="outlined"
          name="bin"
          aria-controls={binOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={binOpen ? 'true' : undefined}
          onClick={handleBinClick}
        >
          Select Bin<ArrowDropDownIcon/>
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
          <p></p>}

        {/* If error is present, display error               */}
        {errorState ? <p className="error">{errorState.error}</p> : <br />}

        {/* If items have been created, generate stickers with QR Code */}
        {itemsCreated.length > 0 ? 
          <div className='render-sticker'>
            {renderSticker}
            <Button 
              type="submit" 
              variant="contained"
              onClick={handleDownload}
              >Export to CSV</Button>
              <br/><br/>
          </div> :
          // <p>itemsCreated is true</p>:
          <>{currentBin && currentQuantity && currentPart ? 
            <Button 
              type="submit" 
              variant="contained"
              onClick={handleSubmit}
              id="submit-button"
              >Add Shipment</Button> :
          <p><i>Select part, quantity, and bin to add shipment...</i></p>}
          </>}

          {download ? <CSVDownload data={csvData} target="_blank" /> : <></>}
          
      </div>  
      <Footer />
    </div>
  );
}

export default ItemCreate;
