import { Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import Modal from '../Modal/Modal'
import { UserModal } from "./UserModal"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const Users = () => {
    let [users, setUsers] = useState()
    let [user, setUser] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('http://localhost:8000/users')
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
            })
    }

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: defaultThemes.default.divider.default
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default,
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                    borderRightColor: defaultThemes.default.divider.default
                },
            },
        },
    };

    const columns = [
        {
            name: 'USERNAME',
            selector: row => row.username,
            sortable: true,
            width: "120px"
        },
        {
            name: 'STATUS',
            selector: row => row.status,
            sortable: true,
            width: "100px",
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
            sortable: true,
            width: "250px",
        },

        {
            name: 'PROJECTS',
            selector: row => row.projects.map(e => e + " | "),
            sortable: true,
            width: "300px",
        },
        {
            name: 'Edit User Projects',
            width: "150px",
            center: true,
            cell: row => <button
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
                className="material-symbols-outlined"
                onClick={() => editUserProjects(row)}
            >
                Edit
            </button>
        },
        {
            name: 'Delete User',
            center: true,
            width: "150px",
            cell: row => <button
                style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                }}
                className="material-symbols-outlined"
                onClick={() => deleteSelectedUser(row.email)}
            >
                Delete
            </button>
        }
    ]

    const deleteSelectedUser = (user) => {
        setSelectedUser(user);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user })
        };
        fetch(`http://localhost:8000/users/${user}`, requestOptions)
            .then(response => response.json())
            .then(data => window.location.reload(false));
    };

    const editUserProjects = (user) => {
        setUser(user)
        setOpen(true)
        console.log(user);
    }
    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingRight:"50px"
            }}>

                <Stack direction="row" spacing={2}>
                    <Button style={{ backgroundColor: "rgba(241, 171, 32, 0.853)" }}
                        variant="contained" startIcon={<GroupAddIcon />} onClick={() => setModalOpen(true)} >
                        New User
                    </Button>
                </Stack>
                {modalOpen && 
                <Modal setOpenModal={setModalOpen} />}
            </div>
            <div className='content'>
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    dense
                    subHeader
                    subHeaderComponent={
                        <input type='text'
                            placeholder='Search a User'
                            className="w-25 from-control" />
                    }
                    subHeaderAlign='left'
                />
            </div>
            {user && <UserModal setOpen={setOpen} open={open} setUser={setUser} user={user} />}
        </>
    )

}
export default Users