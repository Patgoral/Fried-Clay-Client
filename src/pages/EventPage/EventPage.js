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
	let attendeeList
	let messagecontainer 

	//READ ATTENDEES
	useEffect(function () {
		async function getAllAttendees() {
			const attendees = await attendeesAPI.showAttendees()
			attendees.attendees.forEach((attendee) => {
				const attendeeDate = new Date(attendee.date)
				const referenceDate = new Date('3/25/2023')
				attendee.timeDifference = Math.abs(referenceDate - attendeeDate)
			})

			// Sort the attendees by the time difference in ascending order
			attendees.attendees.sort((a, b) => a.timeDifference - b.timeDifference)

			setAttendees(attendees)
			setIsPageLoaded(true)
		}
		getAllAttendees()
	}, [])

	//SHOW A LIST OF ATTENDEES

	if (attendees.length !== 0) {
		attendeeList = attendees.attendees.map((attendee, index) => (
		  <div className="list-of-attendees" key={attendee._id}>
			<AttendeeCard attendee={attendee} key={index} index={index} />
		  </div>
		))
		if (!attendees.attendees[0]) {
		  messagecontainer = "No Results Yet"
		}
	  } else {
		messagecontainer = "No Results Yet"
	  }
	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<Link className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</Link>

				<p>Congratulations on completing the Fried Clay 200k!</p>
				<p>Click the button to submit your time!</p>
				<p>Click on a name on the leaderboard to view details.</p>
				<br></br>
				<div className="button-div">
					<Link className="link" to="/access">
						Submit Your Time
					</Link>
				</div>
			</div>
			<div className="event-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header"><Link to="/update">Leaderboard</Link></div>
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
