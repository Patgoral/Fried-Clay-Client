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
import logo2027 from '../../../images/fc27logo2.png'

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

	⚠️  DO NOT DELETE THIS SECTION ⚠️
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
	const logosByYear = { 2023: logo2023, 2024: logo2024, 2025: logo2025, 2026: logo2026, 2027: logo2027 }
	const logoToShow = logosByYear[year] || logo2027
	const linkTo = `/${logosByYear[year] ? year : 2027}`

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
						<header className="attendee-header">
							<Link className="attendee-brand" to={linkTo} aria-label={`Back to ${year} results`}>
								<img className="attendee-logo" alt="" src={logoToShow} />
							</Link>
							<div className="attendee-heading">
								<p className="attendee-eyebrow">Finisher profile</p>
								<h1>{attendee.name}</h1>
								{attendee.gender && <p className="attendee-gender">{attendee.gender}</p>}
							</div>
							<Link className="attendee-back-link" to={linkTo}>
								Back to results
							</Link>
						</header>

						<section className="attendee-stats" aria-label="Finish results">
							<div className="attendee-stat attendee-stat-time">
								<span className="attendee-stat-label">Finishing time</span>
								<strong>{hasTimingError ? 'Needs verification' : elapsedTime(attendee.finishTime || attendee.date, { compact: true })}</strong>
							</div>

							{!hasTimingError && (
								<>
									<div className="attendee-stat">
										<span className="attendee-stat-label">Overall position</span>
										<strong>{position ?? '—'}</strong>
									</div>
									{(genderPosition || gearedPosition) && (
										<div className="attendee-stat">
											<span className="attendee-stat-label">Category position</span>
											<strong>
												{genderPosition}
												{genderPosition && gearedPosition && ' / '}
												{gearedPosition}
											</strong>
										</div>
									)}
								</>
							)}
						</section>

						{hasTimingError && (
							<div className="attendee-timing-error" role="status">
								<p>We couldn’t verify this finish time.</p>
								<a className="contact-button" href={contactHref} target="_blank" rel="noopener noreferrer">
									Contact to resolve
								</a>
							</div>
						)}
						{attendee.image && (
							<div className="attendee-photo">
								<img alt={`${attendee.name} at the event`} src={attendee.image} />
							</div>
						)}

						<section className="attendee-route-section" aria-labelledby="route-title">
							<div className="attendee-route-heading">
								<h2 id="route-title">Route comparison</h2>
								<div className="attendee-route-legend" aria-label="Route legend">
									<span className="attendee-legend-item"><span className="attendee-swatch official-route" />Official route</span>
									<span className="attendee-legend-item"><span className="attendee-swatch uploaded-route" />Uploaded route</span>
								</div>
							</div>
							<div className="attendee-map">
								<MapComponent year={year} gpx={attendee.gpx} />
							</div>
						</section>
					</div>
				)}				
			</div>
		</>
	)
}
