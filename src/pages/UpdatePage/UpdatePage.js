import './UpdatePage.css'
import { useState, useEffect } from 'react'
import * as attendeesAPI from '../../utilities/attendees-api'
import { dateFormatter } from '../utils/dateFormatter'
import logo from '../../images/fried-clay.png'
import { Link } from 'react-router-dom'

export default function ManagePage() {
	const [attendees, setAttendees] = useState({ attendees: [] })
	const [copy, setCopy] = useState({ attendees: [] })
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const year = new Date().getFullYear()

	useEffect(() => {
		async function getAllAttendees() {
			try {
				const attendees = await attendeesAPI.showAttendees(year)
				setAttendees(attendees)
				setCopy(attendees)
			} finally {
				setIsLoading(false)
			}
		}

		getAllAttendees()
	}, [year])

	async function refreshAttendees(successMessage = '') {
		const attendees = await attendeesAPI.showAttendees(year)
		setAttendees(attendees)
		setCopy(attendees)
		setMessage(successMessage)
	}

	async function handleDeleteAttendee(id) {
		await attendeesAPI.removeAttendee(id)
		await refreshAttendees('Entry Deleted')
	}

	async function handleEditAttendee(attendee) {
		const updatedAttendee = {
			name: attendee.name,
		}

		if (attendee.finishTime !== undefined && attendee.finishTime !== null && attendee.finishTime !== '') {
			updatedAttendee.finishTime = attendee.finishTime
		} else {
			updatedAttendee.date = attendee.date
		}

		await attendeesAPI.updateAttendee(attendee._id, updatedAttendee)
		await refreshAttendees('Entry Updated')
	}

	function handleInputChange(event, id) {
		const { name, value } = event.target

		const updatedAttendees = attendees.attendees.map((p) => {
			if (p._id === id) {
				return { ...p, [name]: value }
			}
			return p
		})

		setAttendees({ attendees: updatedAttendees })
	}

	function getStoredValue(attendeeId, value) {
		const person = copy.attendees.find((p) => p._id === attendeeId)
		if (!person) return null

		if (value === 'name') {
			return <span className="current-field-value">{person.name}</span>
		}

		if (value === 'time') {
			const storedTime = person.finishTime ?? person.date
			return (
				<span className="current-field-value">
					{storedTime ? dateFormatter(storedTime) : 'No Time'}
				</span>
			)
		}

		return null
	}

	const attendeeList = attendees.attendees.map((attendee) => {
		const editableTimeField =
			attendee.finishTime !== undefined && attendee.finishTime !== null
				? 'finishTime'
				: 'date'

		const editableTimeValue =
			attendee.finishTime !== undefined && attendee.finishTime !== null
				? attendee.finishTime
				: attendee.date || ''

		const timeLabel =
			attendee.finishTime !== undefined && attendee.finishTime !== null
				? 'Finish Time'
				: 'Date'

		return (
			<div className="user-attendees" key={attendee._id}>
				<div className="name-container">
					<label className="manage-labels">
						<span className="current-field-desc">Name: </span>
						{getStoredValue(attendee._id, 'name')}
					</label>
				</div>

				<div className="date-container">
					<label className="manage-labels">
						<span className="current-field-desc">{timeLabel}: </span>
						{getStoredValue(attendee._id, 'time')}
					</label>
				</div>

				<div className="input-container">
					<input
						className="name-input"
						placeholder="Name"
						name="name"
						value={attendee.name || ''}
						onChange={(event) => handleInputChange(event, attendee._id)}
					/>
				</div>

				<div className="input-container">
					<input
						className="date-input"
						placeholder={timeLabel}
						name={editableTimeField}
						value={editableTimeValue || ''}
						onChange={(event) => handleInputChange(event, attendee._id)}
					/>
				</div>

				<div className="button-container">
					<button
						className="edit-button"
						onClick={() => handleEditAttendee(attendee)}
					>
						Edit
					</button>

					<button
						className="delete-button"
						onClick={() => handleDeleteAttendee(attendee._id)}
					>
						Delete
					</button>
				</div>
			</div>
		)
	})

	return (
		<div className="manage-page">
			<Link className="link" to="/">
				<img className="logo" alt="logo" src={logo} />
			</Link>

			{isLoading && (
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}

			<h3 id="message-container">{message || '\u00A0'}</h3>

			<div className="user-attendee-list">{attendeeList}</div>
		</div>
	)
}