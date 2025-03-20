import { useState, useEffect } from 'react'
import './Results2025.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

	const endDate = new Date('03/30/2025')
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
			const attendees = await attendeesAPI.showAttendees();

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
	}, []);

	//READ ATTENDEES
	//READ ATTENDEES
	useEffect(function () {
		async function getAllAttendees() {
			const attendees = await attendeesAPI.showAttendees();

			// Filter attendees based on the date range
			const filteredAttendees = attendees.attendees.filter((attendee) => {
				const attendeeDate = new Date(attendee.date);
				return attendeeDate >= startDate && attendeeDate <= endDate;
			});

			// Sort the filtered attendees by date (optional)
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
	}, [startDate, endDate]);


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
			setLogoLinkPath('/');
		}
	}, [])


	// SHOW A LIST OF ATTENDEES
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
		messagecontainer = 'No Results Yet'
	}

	return (
		<div className="event-page">
			<div className="event-page-container-top">
				{/* Dynamic logo link */}
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
					<p class="detailDescDiv">Click a name to view details</p>

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
