// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './EventPage.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

export default function EventPage() {
	// const navigate = useNavigate()
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)
	const [applyLinkClass, setApplyLinkClass] = useState(true)
	const [applyButtonClass, setApplyButtonClass] = useState(false)
	const endDate = new Date('03/31/2024')
	const startDate = new Date('3/23/2024')
	startDate.setHours(8, 0, 0, 0)
	let attendeeList
	let messagecontainer
	// let genderPosition 




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
				state={{ position: index + 1}}
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

				
				<br></br>
				<div className="button-div">
					
				<a className="link" href="https://www.eventbrite.com/e/fried-clay-200k-2025-tickets-1046921529477" target="_blank" rel="noopener noreferrer">
					2025 Registration
				</a>

					<Link className="link" to="/2024">
					 2024 Results
					</Link>

					<Link className="link" to="/2025">
					 2025 Results
					</Link>
					
				</div>
			</div>
			<div className="event-page-list-container">
				 <iframe src="https://www.eventbrite.com/e/fried-clay-200k-2025-tickets-1046921529477" width="100%" height="600" />
			</div>
		</div>
	)
}
