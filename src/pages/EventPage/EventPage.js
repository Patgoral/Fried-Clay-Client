// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './EventPage.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fried-clay.png'

export default function EventPage() {
	// const navigate = useNavigate()
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const [applyLinkClass, setApplyLinkClass] = useState(true)
	const [applyButtonClass, setApplyButtonClass] = useState(false)
	const endDate = new Date('04/06/2024')
	const startDate = new Date('02/23/2024')
	startDate.setHours(10, 37, 0, 0)
	let attendeeList
	let messagecontainer

	//READ ATTENDEES
	useEffect(function () {
		async function getAllAttendees() {
			const attendees = await attendeesAPI.showAttendees()
			attendees.attendees.forEach((attendee) => {
				const attendeeDate = new Date(attendee.date)
				const referenceDate = new Date('3/23/2024')
				attendee.timeDifference = Math.abs(referenceDate - attendeeDate)
			})

			// Sort the attendees by the time difference in ascending order
			attendees.attendees.sort((a, b) => a.timeDifference - b.timeDifference)

			setAttendees(attendees)
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
		}
	}, [])

	//SHOW A LIST OF ATTENDEES

	if (attendees.length !== 0) {
		attendeeList = attendees.attendees.map((attendee, index) => (
			<Link
				className="link"
				state={{ position: index + 1 }}
				to={`/attendees/${attendee._id}`}
			>
				<div className="list-of-attendees" key={attendee._id}>
					<AttendeeCard attendee={attendee} key={index} index={index} />
				</div>
			</Link>
		))
		if (!attendees.attendees[0]) {
			messagecontainer = 'No Results Yet'
		}
	} else {
		messagecontainer = 'No Results Yet'
	}
	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<div className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</div>

				<p className="text">
					Congratulations on completing the Fried Clay 200k!
				</p>
				<p className="text">Click the button to submit your time!</p>
				<br></br>
				<div className="button-div">
					{!applyButtonClass ? (
						<>
							<p id='dead' className="dead">Submissions Open 3/23</p>
						</>
					) : applyLinkClass ? (
						<>
							<Link className="link" to="/access">
								Submit Your Time
							</Link>
							<div className="closed">
								<br></br>
								<p className="close">Submissions Close 4/6/2024</p>
							</div>
						</>
					) : (
						<p className="dead">Submissions Closed</p>
					)}
				</div>
			</div>
			<div className="event-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<p>Click a name to view details</p>

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
