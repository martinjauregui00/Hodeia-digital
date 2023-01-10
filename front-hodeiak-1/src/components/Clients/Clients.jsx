import './Clients.scss'
import { useEffect, useState } from "react"
import DataTable from 'react-data-table-component'

const Clients = () => {
    let [clients, setClients] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('http://localhost:8000/clients')
            .then((res) => res.json())
            .then((res) => {
                setClients(res)
            })
    }


    const columns = [
        {
            name: 'CLIENT',
            selector: row => row.clientname
        },
        {
            name: 'WEB',
            selector: row => row.email
        },
        
    ]

    return (
        <>
            <div className='content'>
                <h2>Clients</h2>

                <DataTable
                    columns={columns}
                    data={clients}
                    pagination
                />
            </div>
        </>
    )

}
export default Clients;