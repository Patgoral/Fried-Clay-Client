import { useState, useEffect } from 'react'
import './Results2026.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay200k26.png'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Sponsors from '../components/Sponsors/Sponsors'

const endDate = new Date('2026-03-30T00:00:00')
const startDate = new Date('2026-03-21T08:00:00-04:00')

export default function EventPage() {
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const [applyLinkClass, setApplyLinkClass] = useState(true)
	const [applyButtonClass, setApplyButtonClass] = useState(false)
	const [logoLinkPath, setLogoLinkPath] = useState('/EventPage')
	const adminOverride = localStorage.getItem("adminOverride") === "true"

	useEffect(() => {
	async function getAllAttendees() {
	try {
		const year = 2026
		const response = await attendeesAPI.showAttendees(year)
		const attendeeList = response.attendees || []

		const getEventTime = (attendee) =>
			attendee.finishTime ?? attendee.date ?? null

		const getEventTimeMs = (attendee) => {
		const time = getEventTime(attendee)
		if (!time || !attendee.createdAt) return null

		const eventDate = new Date(time)
		const createdDate = new Date(attendee.createdAt)

		if (
			Number.isNaN(eventDate.getTime()) ||
			Number.isNaN(createdDate.getTime())
		) {
			return null
		}

		if (eventDate.getFullYear() !== createdDate.getFullYear()) {
			return null
		}

		return eventDate.getTime()
	}

		// Sort by actual timestamp ascending, nulls at end
		const sortedAttendees = [...attendeeList].sort((a, b) => {
			const aMs = getEventTimeMs(a)
			const bMs = getEventTimeMs(b)

			if (aMs === null && bMs === null) return 0
			if (aMs === null) return 1
			if (bMs === null) return -1

			return aMs - bMs
		})

		// Track counts by category so ties share place and next place skips correctly
		const overallState = {
			count: 0,
			lastTimeMs: null,
			lastPosition: null,
		}

		const genderState = {
			Male: { count: 0, lastTimeMs: null, lastPosition: null },
			Female: { count: 0, lastTimeMs: null, lastPosition: null },
			'Non-Binary': { count: 0, lastTimeMs: null, lastPosition: null },
		}

		const gearedState = {
			SS: { count: 0, lastTimeMs: null, lastPosition: null },
			Fixed: { count: 0, lastTimeMs: null, lastPosition: null },
			Geared: { count: 0, lastTimeMs: null, lastPosition: null },
		}

		const assignPlace = (state, timeMs) => {
			state.count += 1

			if (state.lastTimeMs !== null && state.lastTimeMs === timeMs) {
				return state.lastPosition
			}

			state.lastTimeMs = timeMs
			state.lastPosition = state.count
			return state.lastPosition
		}

		sortedAttendees.forEach((attendee) => {
			const timeMs = getEventTimeMs(attendee)

			// No valid finish/date = no placing, stays at end
			if (timeMs === null) {
				attendee.position = null
				attendee.genderPosition = null
				attendee.gearedPosition = null
				return
			}

			// Overall place
			attendee.position = assignPlace(overallState, timeMs)

			// Gender place
			if (genderState[attendee.gender]) {
				const genderPlace = assignPlace(genderState[attendee.gender], timeMs)
				attendee.genderPosition = `${attendee.gender} ${genderPlace}`
			} else {
				attendee.genderPosition = null
			}

		// Geared place
			if (attendee.geared === 'Geared') {
				attendee.gearedPosition = null
			} else if (gearedState[attendee.geared]) {
				const gearedPlace = assignPlace(gearedState[attendee.geared], timeMs)
				attendee.gearedPosition = `${attendee.geared} ${gearedPlace}`
			} else {
				attendee.gearedPosition = null
			}
		})

		setAttendees(sortedAttendees)
	} catch (error) {
		console.error('Error loading attendees:', error)
		setAttendees([])
	} finally {
		setIsPageLoaded(true)
	}
}

	getAllAttendees()
}, [])

	useEffect(() => {
		if (adminOverride) return

		const currentDate = new Date()
		if (currentDate.getTime() >= endDate.getTime()) {
			setApplyLinkClass(false)
		}
	}, [])

	useEffect(() => {
		if (adminOverride) {
			setApplyButtonClass(true)
			setLogoLinkPath('/')
			return
		}

		const currentDate = new Date()
		if (currentDate.getTime() >= startDate.getTime()) {
			setApplyButtonClass(true)
			setLogoLinkPath('/')
		}
	}, [])

	let attendeeList = null
	let messagecontainer = ''

	if (attendees.length > 0) {
		attendeeList = attendees.map((attendee) => (
			<Link
				key={attendee._id}
				className="link"
				state={{
					position: attendee.position,
					genderPosition: attendee.genderPosition,
					gearedPosition: attendee.gearedPosition,
				}}
				to={`/attendees/${attendee._id}`}
			>
				<div className="list-of-attendees">
					<AttendeeCard
						attendee={attendee}
						position={attendee.position}
						genderPosition={attendee.genderPosition}
						gearedPosition={attendee.gearedPosition}
					/>
				</div>
			</Link>
		))
	} else if (isPageLoaded) {
		messagecontainer = 'No Results Yet'
	} else {
		messagecontainer = 'Loading Results'
	}

	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<Link className="link" to={logoLinkPath}>
					<img className="event-logo" alt="logo" src={logo} />
				</Link>

				<p className="text submitTitle">2026 Results</p>

				<div className="heading-div">
					{!applyButtonClass ? (
						<>
							<p id="dead" className="dead">
								Results Final as of 3/29/2026
							</p>
						</>
					) : applyLinkClass ? (
						<>
							<Link className="link submitTitle" to="/access">
								Submit Your Time
							</Link>

							<div className="closed">
								<br />
								<p className="close">Final Results Pending Verification</p>
								<p className="close">Submissions Close 3/29/2026</p>
							</div>
							<div className="button-div">
							<Link className="link" to="/PastResults">
								Past Results
							</Link>
						</div>
						</>
					) : (
						<div className="button-div">
							<Link className="link" to="/PastResults">
								Back To Past Results
							</Link>
						</div>
					)}
				</div>
			</div>

			<div className="event-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<p className="detailDescDiv">Click a name to view details</p>

					<div className="message-container">{messagecontainer}</div>
					

					{isPageLoaded && attendees.length > 0 && (
						<div className="list-container-overflow">{attendeeList}</div>
					)}
					{!isPageLoaded && (
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

				</div>
			</div>
				<Sponsors />

			 <SocialLinks />			
		</div>
	)
}