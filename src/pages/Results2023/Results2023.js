// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Results2023.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fc23logo.png'

const endDate = new Date('03/30/2023')
const startDate = new Date('3/25/2023')
startDate.setHours(8, 0, 0, 0)

export default function EventPage() {
	// const navigate = useNavigate()
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)

	let attendeeList
	let messagecontainer




	//READ ATTENDEES
	//READ ATTENDEES
	useEffect(function () {
		async function getAllAttendees() {
			// Extract the year from startDate (you can also use endDate if needed)
			const year = startDate.getFullYear();
	
			// Pass the year as a query parameter to the API
			const attendees = await attendeesAPI.showAttendees(year);
	
			// Filter attendees based on the date range
			const filteredAttendees = attendees.attendees.filter((attendee) => {
				const attendeeDate = new Date(attendee.date);
				return attendeeDate >= startDate && attendeeDate <= endDate;
			});
	
			// Sort the filtered attendees by date (optional)
			filteredAttendees.sort((a, b) => new Date(a.date) - new Date(b.date));
	
			setAttendees({ attendees: filteredAttendees });
			setIsPageLoaded(true);
		}
	
		getAllAttendees();
	}, [startDate, endDate]);
	


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
