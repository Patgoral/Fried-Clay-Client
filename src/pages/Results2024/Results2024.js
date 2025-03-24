// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Results2024.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/fried-clay.png'

	const endDate = new Date('03/31/2024')
	const startDate = new Date('3/23/2024')
	startDate.setHours(8, 0, 0, 0)

export default function EventPage() {
	// const navigate = useNavigate()
	const [attendees, setAttendees] = useState([])
	const [isPageLoaded, setIsPageLoaded] = useState(false)

	let attendeeList
	let messagecontainer




	//READ ATTENDEES
//READ ATTENDEES
	useEffect(() => {
		async function getAllAttendees() {
			const year = 2025;  // Example: Use the desired year here
			const attendees = await attendeesAPI.showAttendees(year); // Pass year as query parameter
			
			// Filter and sort attendees based on the date
			const filteredAttendees = attendees.attendees.filter((attendee) => {
				const attendeeDate = new Date(attendee.date);
				return attendeeDate >= startDate && attendeeDate <= endDate;
			});

			// Sort attendees by date (oldest first)
			filteredAttendees.sort((a, b) => new Date(a.date) - new Date(b.date));

			// Initialize counters for each gender
			const genderCount = {
				Male: 0,
				Female: 0,
				"Non-Binary": 0
			};

			// Add genderPosition property
			filteredAttendees.forEach((attendee) => {
				let genderCode;

				switch (attendee.gender) {
					case "Male":
						genderCode = "Male ";
						genderCount.Male += 1;
						attendee.genderPosition = `${genderCode}${genderCount.Male}`;
						break;
					case "Female":
						genderCode = "Female ";
						genderCount.Female += 1;
						attendee.genderPosition = `${genderCode}${genderCount.Female}`;
						break;
					case "Non-Binary":
						genderCode = "Non-Binary ";
						genderCount["Non-Binary"] += 1;
						attendee.genderPosition = `${genderCode}${genderCount["Non-Binary"]}`;
						break;
					default:
						attendee.genderPosition = "N/A";  // Fallback for unknown gender
						break;
				}
			});

			setAttendees({ attendees: filteredAttendees });
			setIsPageLoaded(true);
		}

		getAllAttendees();
	}, [startDate, endDate]);  // Make sure to re-fetch when startDate or endDate changes




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
