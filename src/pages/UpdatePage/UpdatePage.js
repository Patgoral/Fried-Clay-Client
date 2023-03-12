import "./UpdatePage.css"
import { getUser } from '../../utilities/users-services';
import { useState, useEffect } from 'react'
import * as attendeesAPI from '../../utilities/attendees-api'
import { dateFormatter } from "../utils/dateFormatter";


export default function ManagePage() {
    const [attendees, setAttendees] = useState([])
    const [copy, setCopy] = useState([])
    let valueHolder = [];
    const currentUser = getUser()
    let attendeeList;
    let userListOfAttendees = [];
    const messageContainer = document.querySelector('#message-container')
    
    //READ THE ATTENDEES
    useEffect(function () {
        async function getAllAttendees() {
            const attendees = await attendeesAPI.showAttendees()
            setAttendees(attendees)
            setCopy(attendees)
        }
        getAllAttendees()
    }, [])
    //HANDLES THE DELETION
    async function handleDeleteAttendee(id) {
        await attendeesAPI.removeAttendee(id)
        async function getAllAttendees() {
            const attendees = await attendeesAPI.showAttendees()
            setAttendees(attendees)
            messageContainer.innerHTML = 'Entry Deleted'
        }
        getAllAttendees()
    }
    //HANDLES EDIT/UPDATE
    async function handleEditAttendee(id, name, location) {
        const updatedAttendee = { name, location }

        await attendeesAPI.updateAttendee(id, updatedAttendee)
        async function getAllAttendees() {
            const attendees = await attendeesAPI.showAttendees()
            setAttendees(attendees)
            setCopy(attendees)
            messageContainer.innerHTML = 'Entry Updated'
        }
        getAllAttendees()
    }
    //HANDLES ANY CHANGES MADE TO INPUT FIELD
    function handleInputChange(event, id) {
        const updatedAttendees = attendees.attendees.map(p => {
            if (p._id === id) {
                return { ...p, [event.target.name]: event.target.value }
            }
            return p
        })
        setAttendees({ attendees: updatedAttendees })
    }
    //CREATES AN ARRAY TO MAP THE ATTENDEES
    if (attendees.length !== 0 && attendees.attendees !== undefined) {
        attendees.attendees.forEach(function (attendee) {
            if (attendee.owner === currentUser._id) {
                userListOfAttendees.push(attendee)
            }
        })
    }
    //STORES A COPY OF THE PREVIOUS STATE BEFORE EDIT/UPDATE
    function getStoredValue(attendeeId, value) {
        copy.attendees.forEach(function (person) {
            if (person._id === attendeeId) {
                valueHolder = [];
                valueHolder.push(person)
            }
        })
        if (value === 'name') {
            return valueHolder.map((tmp, index) => (
            <span key={index} className='current-field-value'>{tmp.name}</span>))
        }
        else if (value === 'date') {
            return valueHolder.map((tmp, index) => (
            <span key={index} className='current-field-value'>{dateFormatter(tmp.date)}</span>))
        }
    }
    //MAPS EVERYTHING TO INTERFACE
    attendeeList = userListOfAttendees.map((attendee, index) => (
        <div className='user-attendees' key={index}>
            <div className='name-container'>
                <label className='manage-labels'><span className='current-field-desc'>Name: </span>{getStoredValue(attendee._id, 'name')}</label>
            </div>
            <div className='date-container'>
                <label className='manage-labels'><span className='current-field-desc'>Date: </span>{getStoredValue(attendee._id, 'date')}</label>
            </div>
            <div className='input-container'>
                <input
                    className='name-input'
                    placeholder='Name'
                    name='name'
                    value={attendee.name || ''}
                    onChange={(event) => handleInputChange(event, attendee._id)}></input>
            </div>
            <div className='input-container'>
                <input
                    className='date-input'
                    placeholder='Date'
                    name='date'
                    value={(attendee.date) || ''}
                    onChange={(event) => handleInputChange(event, attendee._id)}></input>
            </div>
            <div className="button-container">
            <button className='edit-button'
                onClick={() => handleEditAttendee(
                    attendee._id,
                    attendee.name,
                    attendee.date
                )}>Edit</button>
            <button className='delete-button'
                onClick={() => handleDeleteAttendee(attendee._id)}>
                Delete
            </button>
            </div>
            
        </div>
    ))

    return (
        <div className="manage-page">
            <h3 id="message-container">&nbsp;</h3>
            <div className="user-attendee-list">{attendeeList}</div>
        </div>
    )
}
