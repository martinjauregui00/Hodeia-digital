import "./Modal.css";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Password } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button, Stack, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [status, setStatus] = useState('user')
  const [hourCost, setHourCost] = useState('')
   const unique_id = uuid();

  function addNewUser() {
    let newUser = {
      id: unique_id,
      username: username,
      email: email,
      password: password,
      image: '',
      status: status,
      hourCost: hourCost,
      tasks: []
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    };
    fetch('http://localhost:8000/users/create', requestOptions)
      .then(response => response.json())
      .then(data => {
        setUserName("")
        setEmail("")
        setHourCost("")
        setStatus("")
        setPassword("")
        window.location.reload(false);
      });
  }

  function handleUsername(e) {
    setUserName(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handleHourCost(e) {
    setHourCost(e.target.value)
  }

  function handleStatus(e) {
    setStatus(e.target.value)
  }

  return (
    <div className="modalBackgroundNewUser">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h2>Fill below fields to create a new user </h2>
        </div>
        <div className="line-width-modal"></div>
        <div className="body">
          <div className="form">
            <FormControl sx={{ m: 1, minWidth: 120 }}>

              <TextField
                variant="standard"
                color="warning"
                focused
                required
                label="Name"
                margin="normal"
                placeholder="Username"
                className="username"
                name='username'
                value={username}
                onChange={handleUsername}
                sx={{
                  '& > :not(style)': { mb: 1, width: '30ch' },
                }}
              />
              <TextField
                variant="standard"
                color="warning"
                focused
                required
                label="Password"
                type="password"
                margin="normal"
                placeholder="Password"
                className="password"
                name='password'
                value={password}
                onChange={handlePassword}
                sx={{
                  '& > :not(style)': { mb: 1, width: '30ch' },
                }}
              />
              <TextField
                variant="standard"
                color="warning"
                focused
                required
                label="Email"
                type="email"
                margin="normal"
                placeholder="Email"
                className="email"
                name='email'
                value={email}
                onChange={handleEmail}
                sx={{
                  '& > :not(style)': { mb: 1, width: '30ch' },
                }}
              />
              <TextField
                variant="standard"
                color="warning"
                focused
                required
                label="Hour Cost"
                type="number"
                margin="normal"
                placeholder="Hour Cost"
                className="hourCost"
                name='hourCost'
                value={hourCost}
                onChange={handleHourCost}
                sx={{
                  '& > :not(style)': { mb: 1, width: '30ch' },
                }}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                onChange={handleStatus}
                required
                labelId="demo-simple-select-label"
                label="Status"
                value={status} 
              >
                <MenuItem key={"user"} value={"user"}>{"user"}</MenuItem>
                <MenuItem key={"admin"} value={"admin"}>{"admin"}</MenuItem>
              </Select>
              </FormControl>
            </FormControl>

            <Stack direction="row" spacing={2}>
              <Button style={{
                backgroundColor: "rgba(241, 171, 32, 0.853)",
                marginBottom: "20px"
              }}
                variant="contained" startIcon={<CheckBoxIcon />} onClick={addNewUser} >
                Confirm
              </Button>
              <Button style={{
               color: "rgba(241, 171, 32, 0.853)",
               borderColor: "rgba(241, 171, 32, 0.853)",
                marginBottom: "20px"
              }}
                variant="outlined" startIcon={<CancelIcon />} onClick={() => {
                  setOpenModal(false)}} >
                Cancel
              </Button>
              
            </Stack>

          </div>
        </div>
        <div className="footer">

        </div>
      </div>
    </div>
  );
}

export default Modal;