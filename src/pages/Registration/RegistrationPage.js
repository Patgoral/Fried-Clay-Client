import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
import DateTimePicker from 'react-datetime-picker'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/fried-clay.png'

export default function RegistrationPage() {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [date, setDate] = useState(new Date('2024-03-23T08:00:00')) 
	const [image, setImage] = useState(undefined)
	const [gpx, setGpx] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false) 
  

	async function handleAddAttendee(event) {
		event.preventDefault()
		const formData = new FormData()

		if (!name) {
			document.getElementById('message-container').innerHTML =
				'Name Field Is Required'
			return
		}

    if (!date) {
			document.getElementById('message-container').innerHTML =
				'Date Field Is Required'
			return
		}

		if (!image) {
			document.getElementById('message-container').innerHTML =
				'Image Upload Is Required'
			return
		}

    if (!gpx) {
			document.getElementById('message-container').innerHTML =
				'GPX File Upload Is Required'
			return
		}


		const validImageFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.heic']
		const imageFileType = image.name.substr(image.name.lastIndexOf('.'))
		if (!validImageFileTypes.includes(imageFileType.toLowerCase())) {
			document.getElementById('message-container').innerHTML =
				'Invalid Image File'
			return
		}

		// append the attendee name and date to the formData object
		formData.append('attendee[name]', name)
		formData.append('attendee[date]', date)

		// append the image file to the formData object
		formData.append('image', image)

		const gpxFile = gpx && gpx.name.endsWith('.gpx') ? gpx : undefined
		if (!gpxFile) {
			document.getElementById('message-container').innerHTML =
				'Invalid GPX File Type'
			return
		}
		formData.append('gpx', gpxFile)

  

		setIsLoading(true) 
		await attendeesAPI.addAttendee(formData)
		setIsLoading(false) 
		navigate('/')
	}

  if (isLoading) {
    document.getElementById('message-container').innerHTML =
    ''
  }

	function handleInputChange(event) {
		setName(event.target.value)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<Link className="link" to="/">
						<img className="logo" alt="logo" src={logo} />
					</Link>

					<div className="register-header">Submit Your Time
          </div>

					<form
						className="register-form"
						onSubmit={handleAddAttendee}
						encType="multipart/form"
					>
            
						<div className='input'>
							<input className='name'
								placeholder="Full Name"
								name="name"
								value={name}
								onChange={handleInputChange}
							/>
							<DateTimePicker
								disableClock={true}
								className="date-time"
								minDate={new Date('03/23/2024 7:00 AM EST')}
								maxDate={new Date('03/26/2024 9:00 PM EST')}
								onChange={setDate}
								value={date}
								dayPlaceholder="23"
								monthPlaceholder='03'
								yearPlaceholder='2024'
								showLeadingZeros={true}
								calendarIcon={null}
                           
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

						<button
							className="register-button"
							type="submit"
							disabled={isLoading}
						>
							Submit
						</button>
					</form>
          <h3 id="message-container">&nbsp;</h3>
					
					{isLoading && ( // show loading indicator if API call is being made
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
				</div>
			</div>
		</div>
	)
}
