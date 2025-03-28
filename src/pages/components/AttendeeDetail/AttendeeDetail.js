import './AttendeeDetail.css'
import { useParams, useLocation } from 'react-router-dom'
import { indexEachAttendee } from '../../../utilities/attendees-api'
import { useState, useEffect } from 'react'
import { elapsedTime } from '../../utils/dateFormatter'
import MapComponent from '../MapComponent/MapComponent'
import noPhoto from '../../../images/noPhoto.png'
import logo2023 from '../../../images/fc23logo.png'
import logo2024 from '../../../images/fried-clay.png'
import logo2025 from '../../../images/FriedClay5_v1-01.png'
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
	const { position, genderPosition } = location.state || {};



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

	const year = attendee.date ? new Date(attendee.date).getFullYear() : null;
	console.log('yeet');
	console.log(year);
	const logoToShow = year === 2023 ? logo2023 : year === 2024 ? logo2024 : logo2025;
	const linkTo = year === 2023 ? '/2023' : year === 2024 ? '/2024' : '/2025';

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
						<Link className="logo" to={linkTo}>
							<img width="300px" alt="logo" src={logoToShow} />
						</Link>
			
            <div className='attendee-info'>
						<h2>Name: {attendee.name} </h2>
						{attendee.gender && <h2>Gender: {attendee.gender}</h2>}
						<h2>Finishing Time: {elapsedTime(attendee.date)} </h2>
						<h2>Overall Position: {position ?? 'Check Back Later'}</h2>
						{genderPosition && (<h2>Category Position: {genderPosition}</h2>)}

            </div>
						<div className="img">
						<img
							alt="attendeeimage"
							width="250px"
							src={attendee.image || noPhoto}
							onError={(e) => e.target.src = noPhoto}
							/>
						</div><div className='key'>
            
            <div className="box red"></div>
            <p className='key-text' style={{marginRight: "10px"}}>Official Route</p>
          
              <div className="box blue"></div>
              <p className='key-text'> Uploaded Route</p>

              </div>
						<div className="map">
							<MapComponent gpx={attendee.gpx} />
						</div>
					</div>
				)}
			</div>
		</>
	)
}
