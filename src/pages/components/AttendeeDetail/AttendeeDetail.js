import './AttendeeDetail.css'
import { useParams, useLocation } from 'react-router-dom'
import { indexEachAttendee } from '../../../utilities/attendees-api'
import { useState, useEffect } from 'react'
import { elapsedTime } from '../../utils/dateFormatter'
import MapComponent from '../MapComponent/MapComponent'
import logo from '../../../images/fried-clay.png'
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
	const { position } = location.state

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

	return (
		<>
      
        <div className='attendee-detail-container'>
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
            <Link className='logo' to="/"><img width="500px" alt="logo" src={logo} /></Link>
            <h2>Name: {attendee.name} </h2>
            <h2>Finishing Time: {elapsedTime(attendee.date)} </h2>
            <h2>Position: {position ?? 'Check Back Later'}</h2>

            <div className="img">
              <img alt="attendeeimage" width='400px' src={attendee.image} />
            </div>
            <div className="map">
              <MapComponent gpx={attendee.gpx}/>
            </div>
          
       
      </div>
      )}
      </div>
     
    </>
  );
}