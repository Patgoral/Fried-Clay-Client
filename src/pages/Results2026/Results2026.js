import { useState, useEffect } from 'react'
import './Results2026.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay200k26.png'

const endDate = new Date('2026-03-30T00:00:00')
const startDate = new Date('2026-03-01T08:00:00-04:00')

export default function EventPage() {
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const [applyLinkClass, setApplyLinkClass] = useState(true)
	const [applyButtonClass, setApplyButtonClass] = useState(false)
	const [logoLinkPath, setLogoLinkPath] = useState('/EventPage')

	useEffect(() => {
	async function getAllAttendees() {
		try {
			const year = 2026
			const response = await attendeesAPI.showAttendees(year)
			const attendeeList = response.attendees || []

			const getEventTime = (attendee) =>
				attendee.finishTime ?? attendee.date ?? null

			const sortedAttendees = [...attendeeList].sort((a, b) => {
				const aTime = getEventTime(a)
				const bTime = getEventTime(b)

				if (!aTime && !bTime) return 0
				if (!aTime) return 1
				if (!bTime) return -1

				return new Date(aTime) - new Date(bTime)
			})

			let currentPos = 1

			const genderCount = {
				Male: 0,
				Female: 0,
				'Non-Binary': 0,
			}

			const gearedCount = {
				SS: 0,
				Fixed: 0,
			}

			sortedAttendees.forEach((attendee, index) => {
				const currentTime = getEventTime(attendee)

				// No valid time/date = no placing, keep at end
				if (!currentTime) {
					attendee.position = null
					attendee.genderPosition = null
					attendee.gearedPosition = null
					return
				}

				const previousTimedAttendee = [...sortedAttendees]
					.slice(0, index)
					.reverse()
					.find((a) => getEventTime(a))

				const previousTime = previousTimedAttendee
					? getEventTime(previousTimedAttendee)
					: null

				const nextTimedAttendee = sortedAttendees
					.slice(index + 1)
					.find((a) => getEventTime(a))

				const nextTime = nextTimedAttendee
					? getEventTime(nextTimedAttendee)
					: null

				// Overall position logic with ties
				if (previousTime && currentTime === previousTime) {
					attendee.position = previousTimedAttendee.position
				} else {
					attendee.position = currentPos
				}

				if (!nextTime || currentTime !== nextTime) {
					currentPos++
				}

				// Gender position logic
				switch (attendee.gender) {
					case 'Male':
						genderCount.Male++
						attendee.genderPosition = `Male ${genderCount.Male}`
						break
					case 'Female':
						genderCount.Female++
						attendee.genderPosition = `Female ${genderCount.Female}`
						break
					case 'Non-Binary':
						genderCount['Non-Binary']++
						attendee.genderPosition = `Non-Binary ${genderCount['Non-Binary']}`
						break
					default:
						attendee.genderPosition = null
						break
				}

				// Geared position logic
				switch (attendee.geared) {
					case 'SS':
						gearedCount.SS++
						attendee.gearedPosition = `SS ${gearedCount.SS}`
						break
					case 'Fixed':
						gearedCount.Fixed++
						attendee.gearedPosition = `Fixed ${gearedCount.Fixed}`
						break
					default:
						attendee.gearedPosition = null
						break
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
		const currentDate = new Date()
		if (currentDate.getTime() >= endDate.getTime()) {
			setApplyLinkClass(false)
		}
	}, [])

	useEffect(() => {
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
					<img width="300px" alt="logo" src={logo} />
				</Link>

				<p className="text submitTitle">2026 Results</p>

				<div className="heading-div">
					{!applyButtonClass ? (
						<>
							<p id="dead" className="dead">
								Submissions Open 3/21
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
								<p className="close">Submissions Close 3/30/2026</p>
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

					<div className="list-container-overflow">{attendeeList}</div>
				</div>
			</div>
		</div>
	)
}