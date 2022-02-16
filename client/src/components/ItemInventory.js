import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


function ItemInventory() {
  // imports currentEmployee state from HomePage
  const location = useLocation();
  const { logged_in } = location.state;

  const [currentItems, setCurrentItems] = useState([]);

  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    fetch(`/items`).then((res) => {
      if (res.ok) {
        res.json().then((items) => {
          setCurrentItems(items)
          setRendered(true)
          console.log(items);
          })  
      }
    });

  }, []);

  // const renderItems = currentItems.map((item) => {
  //   prices.push(item.part.price)
  //   return <p 
  //   key = {item.id}
  //   >{item.part.description}, price: ${item.part.price}</p>
  // })


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

if (isRendered) {
  return (
    <div className="ItemInventory">
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
      <Footer />
    </div>
  );
  } else {
    return (
      <div className="ItemInventory">
        <Header currentEmployee={logged_in} />
          <p>Loading...</p>
        <Footer />
      </div>
    );
  }
}

export default ItemInventory;
