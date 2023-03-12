import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'

export default function RegistrationPage() {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [date, setDate] = useState(new Date())
	const [image, setImage] = useState(undefined)

	async function handleAddAttendee(event) {
		event.preventDefault()
		const attendeeData = {
			attendee: {
				name,
				date,
				
			},
		}
        console.log(attendeeData)
		await attendeesAPI.addAttendee(attendeeData)
		navigate('/')
	}

	function handleInputChange(event) {
		setName(event.target.value)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<div className="register-header">Submit Your Time</div>
					<form className="register-form" onSubmit={handleAddAttendee} >
						<div>
							<input
								placeholder="Name"
								name="name"
								value={name}
								onChange={handleInputChange}
							/>

							<DateTimePicker
								className="date-time"
								onChange={setDate}
								value={date}
							/>
							<input
								type="file"
								name="image"
								onChange={(e) => setImage(e.target.files[0])}
							/>
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
