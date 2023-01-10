import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import './Modal.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function Modal({ setOpenModal }) {
  const [username, setUserName] = useState('')
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [hourCost, setHourCost] = useState('')
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('')
  const [updateUser, setUpdateUser] = useState('')
  const unique_id = uuid();
  let lolemail = localStorage.getItem('email')
  useEffect(() => {
    const data = fetchUser()
    setUser(data)
    console.log(user);
  }, [])

  const fetchUser = async () => {
    console.log(lolemail);
    const resp = await fetch(`http://localhost:8000/users/${lolemail}`)
    const data = await resp.json()
    return data
  }

  function Update() {

    let lolemail = localStorage.getItem('email')

    let user = {
      username: username,
      email: email,
      password: password,
      status: status,
      hourCost: hourCost
    }

    console.log(user);

    const updateUser = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch(`http://localhost:8000/users/${lolemail}`, updateUser)
      .then(response => setOpenModal(false))
    console.log(user)

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
  function handleUseremail(e) {
    setEmail(e.target.value)
  }


  return (
    <div className=" modal">
      <div className="modalContainerProfile">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="body-editar">
          <h1>Editar datos </h1>
        </div>
        {user && <div className="cuerpo">
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
              value={user.username}
              // onChange={handleUsername}
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
              value={user.password}
              // onChange={handlePassword}
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
              value={user.hourCost}
              // onChange={handleHourCost}
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
              backgroundColor: "rgba(241, 171, 32, 0.853)"
            }}
              variant="contained" startIcon={<CheckBoxIcon />} onClick={() => { Update(); setOpenModal(false) }} >
              Confirm
            </Button>
            <Button style={{
              backgroundColor: "rgba(241, 171, 32, 0.853)"
            }}
              variant="contained" startIcon={<CancelIcon />} onClick={() => setOpenModal(false)} >
              Cancel
            </Button>
          </Stack>

        </div>}
      </div>
    </div>
  );
}

export default Modal;