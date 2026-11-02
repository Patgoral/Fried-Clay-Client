import './AttendeeDetail.css'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { indexEachAttendee, showAttendees } from '../../../utilities/attendees-api'
import { computeRanks } from '../../utils/rankings'
import { useState, useEffect } from 'react'
import { elapsedTime } from '../../utils/dateFormatter'
import MapComponent from '../MapComponent/MapComponent'
import logo2023 from '../../../images/fc23logo.png'
import logo2024 from '../../../images/fried-clay.png'
import logo2025 from '../../../images/FriedClay5_v1-01.png'
import logo2026 from '../../../images/FriedClay200k26.png'
import logo2027 from '../../../images/fc27logo2.png'

import { Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'

export default function AttendeeDetailPage() {
	const [attendee, setAttendee] = useState({
		name: '',
		date: '',
		image: '',
		gpx: '',
	})
	const [isDataReady, setIsDataReady] = useState(false)
	const [isPhotoOpen, setIsPhotoOpen] = useState(false)

	useEffect(() => {
		if (!isPhotoOpen) return
		const onKeyDown = (e) => e.key === 'Escape' && setIsPhotoOpen(false)
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [isPhotoOpen])

	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()
	const [fetchedRanks, setFetchedRanks] = useState({})
	const { position, genderPosition, gearedPosition } = location.state || fetchedRanks
	const goBack = (e) => {
		// location.key is 'default' on a direct visit, so fall back to the year link
		if (location.key !== 'default') {
			e.preventDefault()
			navigate(-1)
		}
	}
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

	useEffect(() => {
		if (location.state || !attendee._id || !attendee.createdAt) return
		let cancelled = false
		const attendeeYear = new Date(attendee.createdAt).getFullYear()
		showAttendees(attendeeYear)
			.then((res) => {
				if (!cancelled) setFetchedRanks(computeRanks(res.attendees || [], attendee._id, attendeeYear))
			})
			.catch(() => {})
		return () => {
			cancelled = true
		}
	}, [attendee._id, attendee.createdAt, location.state])

	useEffect(() => {
		if (attendee.name) document.title = `${attendee.name} | Fried Clay 200K`
	}, [attendee.name])

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
						<Breadcrumbs
							items={[
								{ label: 'Past Results', to: '/PastResults' },
								{ label: String(logosByYear[year] ? year : 2027), to: linkTo },
								{ label: attendee.name || 'Finisher' },
							]}
						/>
						<header className="attendee-header">
							<Link className="attendee-brand" to={linkTo} aria-label={`Back to ${year} results`}>
								<img className="attendee-logo" alt="" src={logoToShow} />
							</Link>
							<div className="attendee-heading">
								<p className="attendee-eyebrow">Finisher profile</p>
								<h1>{attendee.name}</h1>
								{attendee.gender && <p className="attendee-gender">{attendee.gender}</p>}
							</div>
							<Link className="attendee-back-link" to={linkTo} onClick={goBack}>
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
								<a className="contact-button" href={contactHref}>
									Contact to resolve
								</a>
							</div>
						)}
						{attendee.image && (
							<>
								<button
									type="button"
									className="attendee-photo"
									onClick={() => setIsPhotoOpen(true)}
									aria-label="View full size photo"
								>
									<img alt={`${attendee.name} at the event`} src={attendee.image} />
									<span className="attendee-photo-hint">Click to enlarge</span>
								</button>
								{isPhotoOpen && (
									<div
										className="photo-modal-overlay"
										role="dialog"
										aria-modal="true"
										aria-label="Full size photo"
										onClick={() => setIsPhotoOpen(false)}
									>
										<button
											type="button"
											className="photo-modal-close"
											onClick={() => setIsPhotoOpen(false)}
											aria-label="Close photo"
										>
											×
										</button>
										<img
											className="photo-modal-image"
											alt={`${attendee.name} at the event`}
											src={attendee.image}
											onClick={(e) => e.stopPropagation()}
										/>
									</div>
								)}
							</>
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
