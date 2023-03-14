import './AttendeeDetail.css'
import { useParams, useLocation } from 'react-router-dom'
import { indexEachAttendee } from '../../../utilities/attendees-api'
import { useState, useEffect } from 'react'
import { elapsedTime } from '../../utils/dateFormatter'
import MapComponent from '../MapComponent/MapComponent'

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
		let active = true
		async function getSingleAttendee() {
			const singleAttendee = await indexEachAttendee(id)
			setAttendee(singleAttendee.attendees)

			setIsDataReady(true) // set the flag to true when the data is ready
		}
		getSingleAttendee()

		return () => {
			active = false
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
       
            <h2>Title: {attendee.name} </h2>
            <h2>Finishing Time: {elapsedTime(attendee.date)} </h2>
            <h2>Position: {position ?? 'Check Back Later'}</h2>

            <div className="img">
              <img width='400px' src={attendee.image} />
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