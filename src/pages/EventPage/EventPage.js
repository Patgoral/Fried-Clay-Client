// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './EventPage.css'
import * as attendeesAPI from '../../utilities/attendees-api'
import AttendeeCard from '../components/AttendeeCard/AttendeeCard'
import { Link } from 'react-router-dom'



export default function EventPage() {
	// const navigate = useNavigate()
    const [attendees, setAttendees] = useState([])
    let attendeeList;


	    //READ ATTENDEES
		useEffect(function () {
			async function getAllAttendees() {
				const attendees = await attendeesAPI.showAttendees()
				setAttendees(attendees)
			}
			getAllAttendees()
		}, [])
		//SHOW A LIST OF ATTENDEES
		if (attendees.length !== 0) {
			attendeeList = attendees.attendees.map((attendee, index) => (
				<div className='list-of-attendees' key={attendee._id}>
					<AttendeeCard attendee={attendee} key={index} index={index} />
				</div>
			))
		}

	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<p>Congratulations on completing the Fried Clay 200k!</p>
				<p>Click the button to submit your finishing info!</p>
					<div className="button-div">
					<Link className='link' to="/register">Submit Your Time</Link>
				</div>
			</div>
			<div className="event-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<div className="list-container-overflow">{attendeeList}</div>
				</div>
			</div>
		</div>
	)
}
