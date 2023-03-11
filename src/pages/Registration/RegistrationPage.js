import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
import DateTimePicker from 'react-datetime-picker'

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

		}
		setAttendee(addNewAttendee)
		console.log(addNewAttendee)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<div className="register-header">
						Submit Your Time
					</div>
					<form className="register-form" onSubmit={handleAddAttendee}>
						<div>
							<input
								placeholder="Name"
								name="name"
								value={attendee.name || ''}
								onChange={handleInputChange}
							/>
							<div>
                                <DateTimePicker
                                onChange={handleInputChange}
                                value={attendee.date || ''}  />
								{/* <input 
                                placeholder="Date"
								name="date"
                                onChange={handleInputChange}
                                 value={attendee.date || ''} /> */}
							</div>
						</div>
						<button className="register-button" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
