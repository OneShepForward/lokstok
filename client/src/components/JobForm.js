import '../style/App.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function JobForm() {
  // imports currentEmployee state from HomePage
  let location = useLocation();
  let navigate = useNavigate();
  const { logged_in } = location.state; 

  const [clientList, setClientList] = useState([]);
  const [currentClient, setClient] = useState(null);

  const [errorState, setErrorState] = useState(null);

  const [employeeChecked, setEmployeeChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employee_id: null,
    client_id: null,
  });

  useEffect(() => {
    fetch("/clients").then((res) => {
      if (res.ok) {
        res.json().then((clients) => {
          setClientList(clients)
        });
      }
    });

    // fetch("/items").then((res) => {
    //   if (res.ok) {
    //     res.json().then((items) => {
    //       // setItemList(items)
    //     });
    //   }
    // });

  }, []);

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const handleCheck = () => {
    if (employeeChecked) {
      setEmployeeChecked(!employeeChecked)
      setFormData({
        ...formData,
        employee_id: null
      })
    } else {
      setEmployeeChecked(!employeeChecked)
      setFormData({
        ...formData,
        employee_id: logged_in.id
      })
    }
}

  // This won't navigate... why?
  const goHome = () => {
    console.log("Headed home")
    navigate(`/home`);
  }


  console.log(formData)

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        employee_id: formData.employee_id,
        client_id: formData.client_id,
        job_is_active: true,
      }),
    }).then((r) => {
      if (r.ok) {
      r.json().then((job) => {
        console.log("job created: ", job);
        setFormData({
          name: "",
          employee_id: null,
          client_id: null,
        });
        setClient(null)
        setErrorState(null);
      });
    } else {
      r.json().then((errors) => {
        console.log(errors);
        setErrorState(errors);
        setFormData({
          name: "",
          employee_id: null,
          client_id: null,
        });
      });
    }
  })
}

  const handleClientChange = (client) => {
    setClient(client);
    setFormData({
      ...formData,
      client_id: client.id
    })
  }

    // CLIENT MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectClient = (choice) => {
    setAnchorEl(null);
    // Prevents clicking outside menu from updating state
    choice.id ? handleClientChange(choice) : setClient(null)
  };


  
  const clientMenu = clientList.map((client) => {
    return <MenuItem 
    onClick={() => handleSelectClient(client)}
    key = {client.id}
    >Client {client.id}: {client.name}</MenuItem>
  })


  return (
    <div className="JobForm">
      <Header currentEmployee={logged_in}/>
      <h2>Create a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="name-jobform-input"
          type="text"
          placeholder='Job Name...'
          name="name"
          value={formData.name}
          onChange={handleChange}
          />
        <br />
        <br />

      <Button
        id="basic-button"
        variant="outlined"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        Select a Client
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelectClient}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        {clientMenu}
      </Menu>
      {currentClient ? 
        <h3> Client selected: {currentClient.name} </h3> :
        <h3> Select a client</h3>}
      <br/>

        <input
          id="employee-jobform-input"
          type="checkbox"
          name="employee"
          checked={employeeChecked}
          onChange={handleCheck}
          />
        <label htmlFor="employee-jobform-input">Assign to you?</label>
        <br /><br />
      {errorState ? <p className="error">{errorState.error}</p> : <br />}
        <Button type="submit" variant="contained">Create Job</Button>
      </form>
      <Footer />
    </div>
  );
}

export default JobForm;
