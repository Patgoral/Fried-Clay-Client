import { useNavigate } from 'react-router-dom'
import * as attendeesAPI from '../../utilities/attendees-api'
import './RegistrationPage.css'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay200k26.png'

export default function RegistrationPage() {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [gender, setGender] = useState('')
	const [geared, setGeared] = useState('Geared')
	// const [date, setDate] = useState('')
	// const [image, setImage] = useState(undefined)
	const [gpx, setGpx] = useState(undefined)
	const [isLoading, setIsLoading] = useState(false)
	const [showGpxHelpModal, setShowGpxHelpModal] = useState(false)

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
		if (!geared) {
			document.getElementById('message-container').innerHTML =
				'Geared Field Is Required'
			return
		}

		if (!gpx) {
			document.getElementById('message-container').innerHTML =
				'GPX File Upload Is Required'
			return
		}

		formData.append('attendee[name]', name)
		formData.append('attendee[gender]', gender)
		formData.append('attendee[geared]', geared)

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

	function handleInputChange(event) {
		setName(event.target.value)
	}

	function handleGenderChange(event) {
		setGender(event.target.value)
	}

	function handleGearedChange(event) {
		setGeared(event.target.value)
	}

	return (
		<div className="wrap-div">
			<div className="register-page">
				<div className="register-form-container">
					<Link className="link" to="/">
						<img className="logo" alt="logo" src={logo} />
					</Link>

					<div className="register-header">
						Submit Your Time
					</div>

					<form
						className="register-form"
						onSubmit={handleAddAttendee}
						encType="multipart/form"
					>
						<fieldset disabled={isLoading} className="register-fieldset">
							<div className="input">
								<p className="register-header2">Full Name</p>
								<input
									className="name"
									placeholder="Full Name"
									name="name"
									value={name}
									onChange={handleInputChange}
								/>

								<p className="register-header2">Gender</p>
								<select
									className="selectClass"
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

								<p className="register-header2">Geared, SS, Fixed?</p>
								<select
									className="selectClass"
									name="geared"
									value={geared}
									onChange={handleGearedChange}
								>
									<option value="Geared">Geared</option>
									<option value="SS">Single-Speed</option>
									<option value="Fixed">Fixed</option>
								</select>

								<p className="register-header2">Upload GPX File</p>
								<input
									type="file"
									name="gpx"
									onChange={(e) => setGpx(e.target.files[0])}
								/>

								<button
									type="button"
									className="link-button"
									onClick={() => setShowGpxHelpModal(true)}
								>
									Need Help with GPX Files?
								</button>
							</div>

							<button
								className="register-button"
								type="submit"
								disabled={isLoading}
							>
								Submit
							</button>
						</fieldset>
					</form>

					<h3 id="message-container">&nbsp;</h3>

					{isLoading && (
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

					{showGpxHelpModal && (
						<div
							className="gpx-help-modal-overlay"
							onClick={() => setShowGpxHelpModal(false)}
						>
							<div
								className="gpx-help-modal"
								onClick={(e) => e.stopPropagation()}
							>
								<h2>Need Help with GPX Files?</h2>

								<div className="gpx-help-modal-buttons">
									<a
										className="link-button"
										href="https://support.strava.com/hc/en-us/articles/216918437-Exporting-your-Data-and-Bulk-Export#h_01GDP2JB35R4ECM0E6YAH316B9"
										target="_blank"
										rel="noopener noreferrer"
									>
										How To Export From Strava
									</a>

									<a
										className="link-button"
										href="https://support.ridewithgps.com/hc/en-us/articles/13004717775515-Send-to-Device-on-Mobile?_gl=1%2Akwlu63%2A_ga%2AMTYzOTYyNDUzNi4xNzY3NjMxODM5%2A_ga_6YLEX65R10%2AczE3NzMyMzkzMDckbzMkZzAkdDE3NzMyMzkzMDckajYwJGwwJGgw#h_01GSGTE3MR35N2QXGYV9RB5Z3C"
										target="_blank"
										rel="noopener noreferrer"
									>
										How To Export From RideWithGPS
									</a>

									<a
										className="link-button"
										href="https://support.garmin.com/en-US/?faq=W1TvTPW8JZ6LfJSfK512Q8"
										target="_blank"
										rel="noopener noreferrer"
									>
										How to Export From Garmin Connect
									</a>

									<a
										className="link-button"
										href="https://gotoes.org/tools/merge-gps-files"
										target="_blank"
										rel="noopener noreferrer"
									>
										How To Merge Multiple GPX Files
									</a>
								</div>

								<button
									type="button"
									className="register-button"
									onClick={() => setShowGpxHelpModal(false)}
								>
									Close
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}