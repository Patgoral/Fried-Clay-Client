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
	const [gpx, setGpx] = useState(undefined)

	async function handleAddAttendee(event) {
		event.preventDefault()
		const formData = new FormData()

        if (!name) {
            document.getElementById('message-container').innerHTML = 'Name Field Is Required';
            return;
          }

          if (!image) {
            document.getElementById('message-container').innerHTML = 'Image Upload Is Required';
            return;
          }

		// append the attendee name and date to the formData object
		formData.append('attendee[name]', name)
		formData.append('attendee[date]', date)

		// append the image file to the formData object
		formData.append('image', image)
        
        const gpxFile = gpx && gpx.name.endsWith('.gpx')
        ? gpx
        : undefined;
      if (!gpxFile) {
        document.getElementById('message-container').innerHTML = 'Invalid GPX file type';
        return;
      }
      formData.append('gpx', gpxFile);		

		await attendeesAPI.addAttendee(formData)
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
					<form
						className="register-form"
						onSubmit={handleAddAttendee}
						encType="multipart/form"
					>
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
							<p>Upload Image</p>
							<input
								type="file"
								name="image"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							<p>Upload GPX File</p>

							<input
								type="file"
								name="gpx"
								onChange={(e) => setGpx(e.target.files[0])}
							/>
						</div>
						<button className="register-button" type="submit">
							Submit
						</button>
					</form>
                    <h3 id="message-container">&nbsp;</h3>
				</div>
			</div>
		</div>
	)
}
