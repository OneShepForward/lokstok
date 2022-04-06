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

  // populate the list of available parts
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

  // Render a sticker for each of the items created
  const renderSticker = itemsCreated.map((item) => {
    return <ItemSticker
      key={item.id}
      item={item}
    />
  })

  // -- CREATE CSV FILE

  // set headers for CSV
  const [csvData, setCsvData] = useState([
    ["url", "part_description", "item_id", "part_id"]
  ])

  const handleDownload = () => {
    let innerCSV = csvData 
    let data = []
    // each item is pushed into the csv file
    itemsCreated.map((item) => {
      // these values correspond to the headers above
      data = [`/items/${item.id}`, `${item.part.description} `, `${item.id}`, `${item.part.id}`]
      innerCSV.push(data)
    })
    // CSV Data is updated to be used in the CSVDownload component
    setCsvData(innerCSV);
    checkDownload(innerCSV);
  }

  // check the data is good before allowing for download
  let checkDownloadCounter = 0
  const checkDownload = (data) => {
    // check that all of the item data made it into the CSV
    if (data.length > 1 && data.length > itemsCreated.length) {
      // if so, render CSVDownload component
      setDownload(true)
      setTimeout(() => {
        // Allow csv to be downloaded again after 3 seconds
        setCsvData([["url", "item_id", "part_id", "part_description"]])
        setDownload(false)
      }, 3000)
      // try 21 times
    } else if (checkDownloadCounter > 20) {
      console.error("Download failed")
    } else {
      // loop if the download didn't work
      ++checkDownloadCounter
      checkDownload(data);
    }
  }

// -- 

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

          {/* Quantity dropdown menu */}
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

          {/* Bin dropdown menu */}
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

        {/* If error is present, display error */}
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
          <>{currentBin && currentQuantity && currentPart ? 
            <Button 
              type="submit" 
              variant="contained"
              onClick={handleSubmit}
              id="submit-button"
              >Add Shipment</Button> :
          <p><i>Select part, quantity, and bin to add shipment...</i></p>}
          </>}

          {/* Once checkDownload has passed, the CSV Download component will render
          and initiate the download. */}
          {download ? <CSVDownload data={csvData} filename="shipment_info.csv" target="_blank" /> : <></>}
          
      </div>  
      <Footer />
    </div>
  );
}

export default ItemCreate;
