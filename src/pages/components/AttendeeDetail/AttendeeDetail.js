import './AttendeeDetail.css'
import { useParams, useLocation } from 'react-router-dom'
import { indexEachAttendee } from '../../../utilities/attendees-api'
import { useState, useEffect } from 'react'
import { elapsedTime } from '../../utils/dateFormatter'
import MapComponent from '../MapComponent/MapComponent'
import logo2023 from '../../../images/fc23logo.png'
import logo2024 from '../../../images/fried-clay.png'
import logo2025 from '../../../images/FriedClay5_v1-01.png'
import logo2026 from '../../../images/FriedClay200k26.png'

import { Link } from 'react-router-dom'

export default function AttendeeDetailPage() {
	const [attendee, setAttendee] = useState({
		name: '',
		date: '',
		image: '',
		gpx: '',
	})
	const [isDataReady, setIsDataReady] = useState(false)

	const { id } = useParams()
	const location = useLocation()
	const { position, genderPosition, gearedPosition } = location.state || {};
	const resultDate = attendee.finishTime || attendee.date

	const hasTimingError =
		!resultDate ||
		new Date(resultDate).getFullYear() !==
		new Date(attendee.createdAt).getFullYear()
		const contactSubject = encodeURIComponent(
			`Fried Clay Timing Error for ${attendee.name}`
		)

	const attendeeForEmail = { ...attendee }
	delete attendeeForEmail.gpx

	const contactBody = encodeURIComponent(
	`Please Attach Your GPX file to this email so that we can diagnose the issue.

	*DO NOT DELETE*
	SUBMISSION DATA:
	${JSON.stringify(attendeeForEmail, null, 2)}`
	)

	const contactHref = `mailto:patpattersonridesbikes@gmail.com?subject=${contactSubject}&body=${contactBody}`

	useEffect(() => {
		// let active = true
		async function getSingleAttendee() {
			const singleAttendee = await indexEachAttendee(id)
			setAttendee(singleAttendee.attendees)

			setIsDataReady(true)
		}
		getSingleAttendee()

		return () => {
			// active = false
		}
	}, [id])

	const year = attendee.createdAt ? new Date(attendee.createdAt).getFullYear() : null;
	const logoToShow =
	year === 2023
		? logo2023
		: year === 2024
		? logo2024
		: year === 2025
		? logo2025
		: logo2026;

	const linkTo = year === 2023 
		? '/2023' 
		: year === 2024 
		? '/2024' 
		: year === 2025 
		? '/2025' 
		: '/2026';

	return (
		<>
			<div className="attendee-detail-container">
				{!isDataReady && (
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
				{isDataReady && (
					<div className="attendee-detail">
						<Link className="link" to={linkTo}>
							<img className="logo" alt="logo" src={logoToShow} />
						</Link>
			
					<div className="attendee-info">
						<h2>Name: {attendee.name}</h2>
						{attendee.gender && <h2>Gender: {attendee.gender}</h2>}

						<h2>
							Finishing Time: <br />{" "}
							{hasTimingError
								? "Error!"
								: elapsedTime(attendee.finishTime || attendee.date)}
						</h2>

						{hasTimingError ? (
							<a className="contact-button" href={contactHref} target="_blank" rel="noopener noreferrer">
								Contact To Fix
							</a>
						) : (
							<>
								<h2>Overall Position: {position}</h2>

								{(genderPosition || gearedPosition) && (
									<h2>
										Category Position:
										<br />
										{genderPosition && <span>{genderPosition}</span>}
										{genderPosition && gearedPosition && <br />}
										{gearedPosition && <span>{gearedPosition}</span>}
									</h2>
								)}
							</>
						)}
					</div>
						{attendee.image && (
							<div className="img">
								<img
								alt="attendeeimage"
								width="250px"
								src={attendee.image}
								/>
							</div>
						)}

			<div className='key'>
            
            <div className="box red"></div>
            <p className='key-text' style={{marginRight: "10px"}}>Official Route</p>
          
              <div className="box blue"></div>
              <p className='key-text'> Uploaded Route</p>

              </div>
						<div className="map">
							<MapComponent year = {year} gpx={attendee.gpx} />
						</div>
					</div>
				)}				
			</div>
		</>
	)
}
