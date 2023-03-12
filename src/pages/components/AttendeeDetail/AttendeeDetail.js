import "./AttendeeDetail.css"
import { useParams, useLocation } from "react-router-dom";
import { indexEachAttendee } from '../../../utilities/attendees-api'
import { useState, useEffect } from 'react'
import { elapsedTime } from "../../utils/dateFormatter";


export default function AttendeeDetailPage() {
  const [attendee, setAttendee] = useState({ name: '', date: ''})
  const { id } = useParams();
  const location = useLocation()
  const { position } = location.state
 
    useEffect(() => {
      let active = true
      async function getSingleAttendee() {
        const singleAttendee = await indexEachAttendee(id)
      setAttendee(singleAttendee.attendees)
      }
      getSingleAttendee()
      return () => {
        active = false
      }
    },[id])
 console.log(attendee.name)
  return (
    <>
    <div className="attendee-detail">
     <h2>Title: {attendee.name} </h2>
     <h2>Finishing Time: {elapsedTime(attendee.date)} </h2>
     <h2>Position: {position ?? 'Check Back Later'}</h2>
    </div>
    <div className="img">
    <img width='400px' src="https://bikepacking.com/wp-content/uploads/2021/03/2021-fried-clay-200-recap_3.jpg" />
    </div>
    <div className="gpx">
      <iframe height='300px' width='400px'src="https://ridewithgps.com/embeds?type=route&id=41706571&hideSurface=true" ></iframe>
      </div>
      {/* <div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="6410538309"></div><script src="https://strava-embeds.com/embed.js"></script> */}

   </>
  );
}
