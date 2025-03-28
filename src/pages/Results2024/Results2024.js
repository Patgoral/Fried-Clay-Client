// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Results2024.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fried-clay.png'

	const startDate = new Date('3/23/2024')
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
			const year = 2024  
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




	//SHOW A LIST OF ATTENDEES

	if (attendees.length !== 0) {
		attendeeList = attendees.attendees.map((attendee, index) => (

		
			<Link
				className="link"
				state={{ 
					position: index + 1, 
					genderPosition: attendee.genderPosition 
				}}
				to={`/attendees/${attendee._id}`}
			>
				<div className="list-of-attendees" key={attendee._id}>
				
					<AttendeeCard attendee={attendee} key={index} index={index} position={attendee.position} />
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
					<img width="300px" alt="logo" src={logo} />
				</Link>

				<p className="text submitTitle">
					2024 Results
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
