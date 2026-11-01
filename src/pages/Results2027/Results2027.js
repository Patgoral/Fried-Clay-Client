import { useState, useEffect } from 'react'
import '../ResultsShared.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fc27logo2.png'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Sponsors from '../components/Sponsors/Sponsors'

import EventNavBar from '../components/EventNavBar/EventNavBar'

// 2027 results are the home page from 8:00 AM ET 3/20 until 12:01 AM ET 3/29
export const RESULTS_2027_START = new Date('2027-03-20T08:00:00-04:00')
export const RESULTS_2027_END = new Date('2027-03-29T00:01:00-04:00')
export const isResults2027Live = (now = new Date()) =>
	now >= RESULTS_2027_START && now < RESULTS_2027_END

export default function EventPage() {
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const adminOverride =
		sessionStorage.getItem('adminOverride') === 'true' ||
		localStorage.getItem('adminOverride') === 'true'
	const isLive = adminOverride || isResults2027Live()

	useEffect(() => {
	async function getAllAttendees() {
	try {
		const year = 2027
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
		<div className="container event-page results-page">
			{isLive ? (
				<>
					<EventNavBar />
					<section className="submission-box">
						<h1 className="submitTitle">2027 Results</h1>
						<Link className="link submit-time-button" to="/access">
							Submit Your Time
						</Link>
						<div className="submission-notes">
							<p>Final Results Pending Verification</p>
							<p>Submissions Close 3/29/2027</p>
						</div>
					</section>
				</>
			) : (
				<div className="event-page-container-top">
					<Link className="link" to="/">
						<img className="event-logo" alt="logo" src={logo} />
					</Link>

					<p className="text submitTitle">2027 Results</p>

					<div className="heading-div">
						<div className="button-div">
							<Link className="link results-back-button" to="/PastResults">
								Back To Past Results
							</Link>
						</div>
					</div>
				</div>
			)}

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