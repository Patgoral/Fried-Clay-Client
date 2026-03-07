import './UpdatePage.css'
import { useState, useEffect } from 'react'
import * as attendeesAPI from '../../utilities/attendees-api'
import { dateFormatter } from '../utils/dateFormatter'
import logo from '../../images/FriedClay200k26.png'
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

				const normalizedAttendees = {
					...attendees,
					attendees: (attendees.attendees || []).map((attendee) => ({
						...attendee,
						finishTimeInput: attendee.finishTime
							? formatForDateTimeLocal(attendee.finishTime)
							: '',
						dateInput: attendee.date
							? formatForDateTimeLocal(attendee.date)
							: '',
						gender: attendee.gender || '',
						geared: attendee.geared || '',
					})),
				}

				setAttendees(normalizedAttendees)
				setCopy(normalizedAttendees)
			} finally {
				setIsLoading(false)
			}
		}

		getAllAttendees()
	}, [year])

	function formatForDateTimeLocal(value) {
		if (!value) return ''

		const d = new Date(value)
		if (Number.isNaN(d.getTime())) return ''

		const year = d.getFullYear()
		const month = String(d.getMonth() + 1).padStart(2, '0')
		const day = String(d.getDate()).padStart(2, '0')
		const hours = String(d.getHours()).padStart(2, '0')
		const minutes = String(d.getMinutes()).padStart(2, '0')
		const seconds = String(d.getSeconds()).padStart(2, '0')

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
	}

	function convertDateTimeLocalToIso(value) {
		if (!value) return ''

		const d = new Date(value)
		if (Number.isNaN(d.getTime())) return ''

		return d.toISOString()
	}

	async function refreshAttendees(successMessage = '') {
		const attendees = await attendeesAPI.showAttendees(year)

		const normalizedAttendees = {
			...attendees,
			attendees: (attendees.attendees || []).map((attendee) => ({
				...attendee,
				finishTimeInput: attendee.finishTime
					? formatForDateTimeLocal(attendee.finishTime)
					: '',
				dateInput: attendee.date
					? formatForDateTimeLocal(attendee.date)
					: '',
				gender: attendee.gender || '',
				geared: attendee.geared || '',
			})),
		}

		setAttendees(normalizedAttendees)
		setCopy(normalizedAttendees)
		setMessage(successMessage)
	}

	async function handleDeleteAttendee(id) {
		await attendeesAPI.removeAttendee(id)
		await refreshAttendees('Entry Deleted')
	}

	async function handleEditAttendee(attendee) {
		const updatedAttendee = {
			name: attendee.name,
			gender: attendee.gender,
			geared: attendee.geared,
		}

		if (
			attendee.finishTime !== undefined &&
			attendee.finishTime !== null &&
			attendee.finishTime !== ''
		) {
			const isoFinishTime = convertDateTimeLocalToIso(attendee.finishTimeInput)
			updatedAttendee.finishTime = isoFinishTime || attendee.finishTime
		} else {
			const isoDate = convertDateTimeLocalToIso(attendee.dateInput)
			updatedAttendee.date = isoDate || attendee.date
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

		if (value === 'gender') {
			return (
				<span className="current-field-value">
					{person.gender || 'No Gender'}
				</span>
			)
		}

		if (value === 'geared') {
			return (
				<span className="current-field-value">
					{person.geared || 'No Category'}
				</span>
			)
		}

		return null
	}

	const attendeeList = attendees.attendees.map((attendee) => {
		const usesFinishTime =
			attendee.finishTime !== undefined && attendee.finishTime !== null

		const editableTimeField = usesFinishTime ? 'finishTimeInput' : 'dateInput'
		const editableTimeValue = usesFinishTime
			? attendee.finishTimeInput || ''
			: attendee.dateInput || ''

		const timeLabel = usesFinishTime ? 'Finish Time' : 'Date'

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

				<div className="date-container">
					<label className="manage-labels">
						<span className="current-field-desc">Gender: </span>
						{getStoredValue(attendee._id, 'gender')}
					</label>
				</div>

				<div className="date-container">
					<label className="manage-labels">
						<span className="current-field-desc">Geared: </span>
						{getStoredValue(attendee._id, 'geared')}
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
						type="datetime-local"
						step="1"
						className="date-input"
						name={editableTimeField}
						value={editableTimeValue}
						onChange={(event) => handleInputChange(event, attendee._id)}
					/>
				</div>

				<div className="input-container">
					<select
						className="date-input"
						name="gender"
						value={attendee.gender || ''}
						onChange={(event) => handleInputChange(event, attendee._id)}
					>
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Non-Binary">Non-Binary</option>
						<option value="Not Disclosed">Not Disclosed</option>
					</select>
				</div>

				<div className="input-container">
					<select
						className="date-input"
						name="geared"
						value={attendee.geared || ''}
						onChange={(event) => handleInputChange(event, attendee._id)}
					>
						<option value="">Select Category</option>
						<option value="Geared">Geared</option>
						<option value="SS">Single-Speed</option>
						<option value="Fixed">Fixed</option>
					</select>
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