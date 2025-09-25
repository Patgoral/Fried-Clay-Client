import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

export default function RegistrationPage() {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [gender, setGender] = useState('')
	const [date, setDate] = useState('') 
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
		if (!gender) {
			document.getElementById('message-container').innerHTML =
				'Gender Field Is Required'
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
		formData.append('attendee[gender]', gender)
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

	function handleGenderChange(event) {
		setGender(event.target.value)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<Link className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
					</Link>

					<div className="register-header">
						Submit Your Time
          			</div>

					<form
						className="register-form"
						onSubmit={handleAddAttendee}
						encType="multipart/form"
					>
            
						<div className='input'>
						<p className="register-header2">Full Name</p>
							<input className='name'
								placeholder="Full Name"
								name="name"
								value={name}
								onChange={handleInputChange}
							/>
						<p className="register-header2">Gender</p>
						<select 
							className='gender'
							name="gender"
							value={gender}
							onChange={handleGenderChange}

							>
							<option value="" disabled>Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Non-Binary">Non-Binary</option>
							<option value="Not Disclosed">I Prefer Not to Say</option>
						</select>

						<p className="register-header2">Finishing Date & Time</p>
							<DateTimePicker
								disableClock={true}
								className="date-time"
								minDate={new Date('03/21/2026 3:00 PM EST')}
								maxDate={new Date('03/24/2026 9:00 PM EST')}
								onChange={setDate}
								value={date}
								dayPlaceholder=""
								monthPlaceholder=""
								yearPlaceholder=""
								showLeadingZeros={true}
								calendarIcon={null}
                           
							/>

							<p className="register-header2">Upload Finishing Image</p>
							<input
								type="file"
								name="image"
								onChange={(e) => setImage(e.target.files[0])}
							/>
							<p className="register-header2">Upload GPX File</p>

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
