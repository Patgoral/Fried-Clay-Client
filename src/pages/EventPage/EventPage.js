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
	const endDate = new Date('03/22/2025')
	const startDate = new Date('3/24/2025')
	startDate.setHours(8, 0, 0, 0)
	let attendeeList
	let messagecontainer
	// let genderPosition 




	//READ ATTENDEES
	useEffect(function () {
		async function getAllAttendees() {
			const attendees = await attendeesAPI.showAttendees();
			
	
			// Filter attendees based on the date range
			const filteredAttendees = attendees.attendees.filter((attendee) => {
				const attendeeDate = new Date(attendee.date);
				return attendeeDate >= startDate && attendeeDate <= endDate;
			});
	
			// Sort the filtered attendees by date
			filteredAttendees.sort((a, b) => new Date(a.date) - new Date(b.date));
	
			setAttendees({ attendees: filteredAttendees });
			setIsPageLoaded(true);
		}
		getAllAttendees();
	}, []);
	

	useEffect(() => {
		const currentDate = new Date();
		if (currentDate.getTime() >= endDate.getTime()) {
			setApplyLinkClass(false);
		}
	}, [endDate]); // Add 'endDate' to the dependency array
	

	useEffect(() => {
		const currentDate = new Date()
		if (currentDate.getTime() >= startDate.getTime()) {
			setApplyButtonClass(true)
		}
	}, [startDate])

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
				<Link className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</Link>

				<p className="text">Submit Your Time Below</p>
				<br></br>
				<div className="button-div">
					{!applyButtonClass ? (
						<>
							<p >Submissions Open 3/22</p>
						</>
					) : applyLinkClass ? (
						<>
							
							<Link className="link" to="/access">
								Submit Your Time
							</Link>
							<div className="closed">
								<br></br>
								<p className="close">Final Results Pending Verification</p>
								<p className="close">Submissions Close 3/30/2025</p>
							</div>
						</>
					) : (
					<p className="close">Submissions Close 3/30/2025</p>
				)}
			
				</div>
				<br></br>
				<div className="button-div">
				<Link className="link" to="/2024">
					Past Results
				</Link>
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
