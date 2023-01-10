import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Modal from './Modal'
import './Profile.scss'
import EditIcon from '@mui/icons-material/Edit';
const Profile = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [projects, setProjects] = useState(' ');
    const [hourCost, setHourCost] = useState(' ');
    const [modalOpen, setModalOpen] = useState(false);

    const getData = () => {

        return localStorage.getItem('email')
    }

    useEffect(() => {
        setEmail(getData());
    }, [])

    fetch(`http://localhost:8000/users/${email}`)
        .then((res) => res.json())
        .then((res) => {
            setStatus(res.status)
            setUsername(res.username)
            setHourCost(res.hourCost)
            setProjects(res.projects)
        })




    return (
        <>
            <div className="content">
                <h2>Profile</h2>
                <div className='datos'>
                    <div className='datos-user'>
                    <div className='profile-image'>
                        <img src='https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png' />
                    </div>
                    <div className='DataConModal'>
                        <div className='Data'>
                            <div className='list'>
                                <p>email: </p>
                                <p>status: </p>
                                <p>username: </p>
                                <p>hour cost: </p>
                                <p>projects: </p>

                            </div>
                            <div className='listName'>
                                <p>{email}</p>
                                <p>{status}</p>
                                <p>{username}</p>
                                <p>{hourCost} $</p>
                                <p>{projects}</p>
                            </div>

                        </div>


                    </div>
                    </div>
                    <div className='edit'>

                        <Stack direction="row" spacing={2}>
                            <Button style={{
                                backgroundColor: "rgba(241, 171, 32, 0.853)"
                            }}
                                variant="contained" startIcon={<EditIcon />} onClick={() => setModalOpen(true)} >
                                Edit
                            </Button>
                        </Stack>
                        {modalOpen && <Modal setOpenModal={setModalOpen} />}
                    </div>
                </div>
            </div>
        </>
    )
}




export default Profile;