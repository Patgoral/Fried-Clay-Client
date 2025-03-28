// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Results2023.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fc23logo.png'

const startDate = new Date('3/25/2023')
startDate.setHours(8, 0, 0, 0)

export default function EventPage() {
	// const navigate = useNavigate()
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)

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
			
			})
			

			// Set attendees with both position and genderPosition
			setAttendees({ attendees: attendees.attendees })
			setIsPageLoaded(true)
		}

		getAllAttendees()
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
		messagecontainer = 'Loading Results'
	}
	return (
		<div className="past-results-page">
			<div className="past-results-page-container-top">
				<Link className="link" to="/">
					<img width="200px" alt="logo" src={logo} />
				</Link>

				<p className="text submitTitle">
					2023 Results
				</p>
				<div className="button-div">						
					<Link className="link" to="/PastResults">
					 	Back To Past Results
					</Link>
				</div>

			</div>
			<div className="past-results-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<p class="detailDescDiv">We did not gather gender info this year.</p>
					<p class="detailDescDiv">Click a name to view details</p>


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
