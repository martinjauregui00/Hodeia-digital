import './Tasks.scss'
import React, { useEffect, useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import ModalTask from '../Modal/ModalTask'



export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [projects, setProjects] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [obj, setObj] = useState({})

  const status = localStorage.getItem('status')
  const loggedUser = localStorage.getItem('email')


  useEffect(() => {
    if (status != 'admin') {
      fetch(`http://localhost:8000/tasks/search/${loggedUser}`)
        .then(response => response.json())
        .then(data => {

          setProjects([...data, ...INITIAL_EVENTS])
          data.id = createEventId()
        })
    } else {
      fetch('http://localhost:8000/tasks')
        .then(response => response.json())
        .then(data => {
          setProjects([...data, ...INITIAL_EVENTS])
        })
    }
  }, [])

  function handleDateSelect(selectInfo) {
    // console.log(event)

    let calendarApi = selectInfo.view.calendar
    setModalOpen(calendarApi)

    calendarApi.unselect() // clear date selection

    setObj({
      id: createEventId(),
      title: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      user: ""
    })
  }

  function handleEventClick(clickInfo) {
    let confirm = prompt('write "confirm" to delete the event').toLowerCase()

    if (confirm === "confirm") {
      deleteTask(clickInfo.event._def.publicId)

      clickInfo.event.remove()
    }
  }

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function deleteTask(id) {
    console.log(id)
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id})
    };
    fetch(`http://localhost:8000/tasks/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  function renderSidebarEvent(event) {
    return (
      <li>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    )
  }

  function RenderSidebar({ handleWeekendsToggle, weekendsVisible }) {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
      </div>
    )
  }

  function RenderSidebar({ handleWeekendsToggle, weekendsVisible }) {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
      </div>
    )
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (

    <div className='demo-app'>
      {<RenderSidebar handleWeekendsToggle={handleWeekendsToggle} weekendsVisible={weekendsVisible} />}
      <div className='demo-app-main'>
        <div className='modal' style={{
          display: 'flex',
          justifyContent: 'center',
          zIndex: '999',
          width: '100%',
        }}>
          {modalOpen != false && <ModalTask setObj={setObj} obj={obj} setOpenModal={setModalOpen} modalOpen={modalOpen} />}
        </div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={projects} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}

        />
      </div>
    </div>
  )
}