import './UpdatePage.css'
import { useState, useEffect } from 'react'
import * as attendeesAPI from '../../utilities/attendees-api'
import { dateFormatter } from '../utils/dateFormatter'
import logo from '../../images/fc27logo2.png'
import { Link } from 'react-router-dom'

export default function ManagePage() {
	const [attendees, setAttendees] = useState({ attendees: [] })
	const [copy, setCopy] = useState({ attendees: [] })
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [search, setSearch] = useState('')

	const year = new Date().getFullYear()

	const isMobile =
		/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
			navigator.userAgent
		)

	useEffect(() => {
		async function getAllAttendees() {
			try {
				const attendees = await attendeesAPI.showAttendees(year)

				const normalizedAttendees = {
					...attendees,
					attendees: (attendees.attendees || []).map((attendee) => ({
						...attendee,
						finishTimeInput: attendee.finishTime
							? isMobile
								? formatForManualDateTime(attendee.finishTime)
								: formatForDateTimeLocal(attendee.finishTime)
							: '',
						dateInput: attendee.date
							? isMobile
								? formatForManualDateTime(attendee.date)
								: formatForDateTimeLocal(attendee.date)
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
	}, [year, isMobile])

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

	function formatForManualDateTime(value) {
		if (!value) return ''

		const d = new Date(value)
		if (Number.isNaN(d.getTime())) return ''

		const year = d.getFullYear()
		const month = String(d.getMonth() + 1).padStart(2, '0')
		const day = String(d.getDate()).padStart(2, '0')
		const hours = String(d.getHours()).padStart(2, '0')
		const minutes = String(d.getMinutes()).padStart(2, '0')
		const seconds = String(d.getSeconds()).padStart(2, '0')

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
	}

	function convertDateTimeLocalToIso(value) {
		if (!value) return ''

		const d = new Date(value)
		if (Number.isNaN(d.getTime())) return ''

		return d.toISOString()
	}

	function convertManualDateTimeToIso(value) {
		if (!value) return ''

		const match = value.match(
			/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/
		)

		if (!match) return ''

		const [, year, month, day, hour, minute, second] = match

		const d = new Date(
			Number(year),
			Number(month) - 1,
			Number(day),
			Number(hour),
			Number(minute),
			Number(second)
		)

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
					? isMobile
						? formatForManualDateTime(attendee.finishTime)
						: formatForDateTimeLocal(attendee.finishTime)
					: '',
				dateInput: attendee.date
					? isMobile
						? formatForManualDateTime(attendee.date)
						: formatForDateTimeLocal(attendee.date)
					: '',
				gender: attendee.gender || '',
				geared: attendee.geared || '',
			})),
		}

		setAttendees(normalizedAttendees)
		setCopy(normalizedAttendees)
		setMessage(successMessage)
	}

	async function handleDeleteAttendee(id, name) {
		const confirmed = window.confirm(
			`Are You Sure You Want To Delete${name ? ` ${name}` : ''}?`
		)

		if (!confirmed) return

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
			const isoFinishTime = isMobile
				? convertManualDateTimeToIso(attendee.finishTimeInput)
				: convertDateTimeLocalToIso(attendee.finishTimeInput)

			if (!isoFinishTime) {
				setMessage('Use YYYY-MM-DD HH:MM:SS for mobile time entry')
				return
			}

			updatedAttendee.finishTime = isoFinishTime || attendee.finishTime
		} else {
			const isoDate = isMobile
				? convertManualDateTimeToIso(attendee.dateInput)
				: convertDateTimeLocalToIso(attendee.dateInput)

			if (!isoDate) {
				setMessage('Use YYYY-MM-DD HH:MM:SS for mobile time entry')
				return
			}

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

	const normalizedSearch = search.trim().toLowerCase()
	const visibleAttendees = normalizedSearch
		? attendees.attendees.filter((attendee) =>
				(copy.attendees.find((p) => p._id === attendee._id)?.name || attendee.name || '')
					.toLowerCase()
					.includes(normalizedSearch)
			)
		: attendees.attendees

	const attendeeList = visibleAttendees.map((attendee) => {
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
						type={isMobile ? 'text' : 'datetime-local'}
						step={isMobile ? undefined : '1'}
						className="date-input"
						name={editableTimeField}
						value={editableTimeValue}
						placeholder={isMobile ? 'YYYY-MM-DD HH:MM:SS' : ''}
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
						onClick={() =>
							handleDeleteAttendee(attendee._id, attendee.name)
						}
					>
						Delete
					</button>
				</div>
			</div>
		)
	})

	return (
		<div className="container manage-page">
			<header className="manage-header">
				<Link className="link manage-logo-link" to="/">
					<img className="logo" alt="Fried Clay 200k" src={logo} />
				</Link>
				<div className="manage-heading">
					<h1>Manage {year} Entries</h1>
					<p className="manage-count">
						{normalizedSearch
							? `${visibleAttendees.length} of ${attendees.attendees.length}`
							: attendees.attendees.length}{' '}
						entries
					</p>
				</div>
			</header>

			<div className="manage-search">
				<input
					type="search"
					className="manage-search-input"
					placeholder="Search by name"
					aria-label="Search entries by name"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
				{search && (
					<button
						type="button"
						className="manage-search-clear"
						onClick={() => setSearch('')}
					>
						Clear
					</button>
				)}
			</div>

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

			<p className="manage-message" role="status">{message || '\u00A0'}</p>

			<div className="user-attendee-list">
				{attendeeList}
				{!isLoading && attendeeList.length === 0 && (
					<p className="manage-empty">No entries found.</p>
				)}
			</div>
		</div>
	)
}