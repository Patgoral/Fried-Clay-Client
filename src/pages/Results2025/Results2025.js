import { useState, useEffect } from 'react'
import './Results2025.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

const endDate = new Date('04/02/2025')
const startDate = new Date('03/22/2025')
startDate.setHours(8, 0, 0, 0)

export default function EventPage() {
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const [applyLinkClass, setApplyLinkClass] = useState(true)
	const [applyButtonClass, setApplyButtonClass] = useState(false)
	const [logoLinkPath, setLogoLinkPath] = useState('/EventPage')  // Dynamic link path

	let attendeeList
	let messagecontainer

	// READ ATTENDEES
	useEffect(() => {
		async function getAllAttendees() {
			const year = 2025  
			const attendees = await attendeesAPI.showAttendees(year)

			// Sort attendees by date first
			attendees.attendees.sort((a, b) => new Date(a.date) - new Date(b.date))

			// Assign overall positions
			let currentPos = 1

			// Initialize gender counters
			const genderCount = {
				Male: 0,
				Female: 0,
				"Non-Binary": 0
			}

			attendees.attendees.forEach((attendee, index) => {
				// Assign position for the first attendee or non-tie
				if (index === 0 || attendee.date !== attendees.attendees[index - 1].date) {
					attendee.position = currentPos
				} else {
					// Use the same position for ties
					attendee.position = attendees.attendees[index - 1].position
				}
			
				// Increment position only when moving past a tie group
				if (index === attendees.attendees.length - 1 || attendee.date !== attendees.attendees[index + 1].date) {
					currentPos = index + 2  // Move to the next rank based on index
				}
			
				// Gender position logic
				switch (attendee.gender) {
					case "Male":
						genderCount.Male++
						attendee.genderPosition = `Male ${genderCount.Male}`
						break
					case "Female":
						genderCount.Female++
						attendee.genderPosition = `Female ${genderCount.Female}`
						break
					case "Non-Binary":
						genderCount["Non-Binary"]++
						attendee.genderPosition = `Non-Binary ${genderCount["Non-Binary"]}`
						break
					default:
						attendee.genderPosition = "N/A"
						break
				}
			})
			

			// Set attendees with both position and genderPosition
			setAttendees({ attendees: attendees.attendees })
			setIsPageLoaded(true)
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

	// SHOW A LIST OF ATTENDEES
	if (attendees.length !== 0) {
		attendeeList = attendees.attendees.map((attendee) => (
			<Link
				key={attendee._id}
				className="link"
				state={{ 
					position: attendee.position, 
					genderPosition: attendee.genderPosition 
				}}
				to={`/attendees/${attendee._id}`}
			>
				<div className="list-of-attendees">
					<AttendeeCard 
						attendee={attendee}
						position={attendee.position}
						genderPosition={attendee.genderPosition}
					/>
				</div>
			</Link>
		))

		if (!attendees.attendees[0]) {
			messagecontainer = 'Loading Results'
		}
	} else {
		messagecontainer = 'Loading Results'
	}

	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<Link className="link" to={logoLinkPath}>
					<img width="300px" alt="logo" src={logo} />
				</Link>

				<p className="text submitTitle">2025 Results</p>
		
				<div className="heading-div">
					{!applyButtonClass ? (
						<>
							<p id='dead' className="dead">Submissions Open 3/22</p>
						</>
					) : applyLinkClass ? (
						<>
							<Link className="link submitTitle" to="/access">
								Submit Your Time
							</Link>

							<div className="closed">
								<br />
								<p className="close">Final Results Pending Verification</p>
								<p className="close">Submissions Close 3/30/2025</p>
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
					<p class="detailDescDiv">We did not gather gearing info this year.</p>

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
