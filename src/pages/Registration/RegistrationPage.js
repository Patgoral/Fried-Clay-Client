import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
// import DatePicker from '../components/DatePicker/DatePicker'
// import TimePicker from 'react-time-picker'

export default function RegistrationPage({ attendee, setAttendee }) {
	const navigate = useNavigate()
    

	async function handleAddAttendee(event) {
		event.preventDefault()
		const attendeeData = { attendee: attendee }
		const attendeeToAdd = await attendeesAPI.addAttendee(attendeeData)
		setAttendee(attendeeToAdd)
		navigate('/')
	}

	//HANDLES THE CHANGE IN INPUT
	function handleInputChange(event) {
		const addNewAttendee = {
			...attendee,
			[event.target.name]: event.target.value,
			[event.target.date]: event.target.value,
			[event.target.time]: event.target.value,
		}
		setAttendee(addNewAttendee)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<div className="register-header">
						Enter your Info below to Join Us!
					</div>
					<form className="register-form" onSubmit={handleAddAttendee}>
						<div>
							<input
								placeholder="Name"
								name="name"
								value={attendee.name || ''}
								onChange={handleInputChange}
							/>
							{/* <DatePicker 
								value={attendee.date || ''}
								onChange={handleInputChange}
							/>
							<TimePicker
								value={attendee.time || ''}
								onChange={handleInputChange}
							/> */}
						</div>
						<button className="register-button" type="submit">
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
