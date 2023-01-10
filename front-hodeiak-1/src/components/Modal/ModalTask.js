import "./ModalTask.css";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { SecondModal } from "./SecondModal/SecondModal";
import { Button, Stack, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
function ModalTask({ setOpenModal, obj, modalOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [pbi, setPbi] = useState(null);
  const [start, setStart] = useState(Date);
  const [end, setEnd] = useState(Date);
  const [user, setUser] = useState("");
  const [secondModalOpen, setSecondModalOpen] = useState(false)
  const unique_id = uuid();

  function horario() {
    let t = new Date('Wed Dec 21 2022 00:00:00 GMT+0100');
    let t2 = new Date('Tue Dec 20 2022 00:00:00 GMT+0100');

    let diferenciaEnMilisegundos = t - t2;
  }

  useEffect(() => {
    setLocalUser()
  }, [])

  useEffect(() => {
    if (pbi) {
      console.log(pbi);
    }

  }, [pbi])

  function setLocalUser() {
    setUser(localStorage.getItem('email'));
  }

  function addProyect() {
    // horario()
    let newObj = {
      id: unique_id,
      title: title,
      description: description,
      start: obj.start,
      end: obj.end,
      user: user
    }

    modalOpen.addEvent(newObj)
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObj)
    };
    fetch('http://localhost:8000/tasks', requestOptions)
      .then(response => response.json())
      .then(data => console.log());

    pbi.tasks = [...pbi.tasks, unique_id]
    const putTaskInPbi = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pbi)
    };
    fetch(`http://localhost:8000/pbis/${pbi.id}`, putTaskInPbi)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const handleSubmit = event => {
    addProyect()
    setOpenModal(false)
    
  };


  return (
    <>
      <div className="modalBackgroundTask">
        <div className="modalContainerTask">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="projects">
            <h2 className="titulo-modal">Select Project, Epic, Feature and PBI to assign task</h2>
            <SecondModal setPbi={setPbi} />
          </div>
          <div className="line-width"></div>
          <div className="title">
            <h2 className="titulo-modal">Fill below fields to create a new task</h2>
          </div>
          <div className="body">
            <form className="form" onSubmit={handleSubmit} >
              <TextField
                variant="standard"
                color="warning"
                focused
                margin="normal"
                placeholder="Title"
                className="title"
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  '& > :not(style)': { mb: 1, width: '30ch' },
                }}
              />
              <TextField
                variant="standard"
                color="warning"
                focused
                margin="normal"
                placeholder="Description"
                className="description"
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  '& > :not(style)': { mb: 5, width: '30ch' },
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button style={{
                  backgroundColor: "rgba(241, 171, 32, 0.853)"
                }}
                  variant="contained" startIcon={<CheckBoxIcon />} onClick={() => handleSubmit()} >
                  Confirm
                </Button>
                <Button style={{
                  color: "rgba(241, 171, 32, 0.853)",
                  borderColor: "rgba(241, 171, 32, 0.853)"
                }}
                  variant="outlined" startIcon={<CancelIcon />} onClick={() => { setOpenModal(false) }}>
                  Cancel
                </Button>
              </Stack>
            </form>
          </div>
          <div className="footer">

          </div>
        </div>
      </div>
    </>
  );
}

export default ModalTask;