import '../style/App.css';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import loadingGif from "../image/lokstok_loading.gif";

function ItemInventory() {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  const [currentItems, setCurrentItems] = useState([]);

  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/active_items`).then((res) => {
      if (res.ok) {
        res.json().then((items) => {
          setCurrentItems(items)
          setLoaded(true)
        })  
      }
    });

  }, []);


  const rows: GridRowsProp =   currentItems.map((item) => {
    return Object.assign({}, item, 
      {
        id: item.id, 
        col1: item.id, 
        col2: item.part.description, 
        col3: item.part.manufacturer, 
        col4: item.part.part_number, 
        col5: item.part.price, 
        col6: item.bin
      }
    )
  })

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Item ID', width: 150, flex: 0.3, hide: true },
    { field: 'col2', headerName: 'Description', width: 150, flex: 1 },
    { field: 'col3', headerName: 'Manufacturer', width: 150, flex: 0.5, hide: true},
    { field: 'col4', headerName: 'Part Number', width: 150, flex: 0.5 },
    { field: 'col5', headerName: 'Price', width: 150, flex: 0.5 },
    { field: 'col6', headerName: 'Bin', width: 150, flex: 0.5 },
  ];

if (isLoaded) {
  return (
    <div className="itemInventory">
      <div id="top-to-footer">
        <Header currentEmployee={logged_in} />
        <div style-={{ display: 'flex', height: '100%' }}>
          <div className='grid-holder' style={{ flexGrow: 1, height: 400, width: '85%', marginTop: 25, marginLeft: "auto", marginRight: "auto", borderRadius: "25px", borderStyle: "hidden" }}>
            <DataGrid 
              rows={rows} 
              columns={columns} 
              disableSelectionOnClick
              sx={{ 
                borderRight: 0, 
                borderTop: 0, 
                borderBottom: 0,
              }}
              />
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
  } else {
    return (
      <div className="itemInventory">
        <div id="top-to-footer">
          <Header currentEmployee={logged_in} />
          <div className='loading-gif'>
            <img src={loadingGif} alt="Loading animation" id="loading"/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ItemInventory;
