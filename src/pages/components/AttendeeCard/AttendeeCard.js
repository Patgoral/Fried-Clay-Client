import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/dateFormatter";
import './AttendeeCard.css'

export default function AttendeeCard({ attendee, index }) {
   

  return (
    
    <div className='attendee-card' >
      {index+1}&nbsp;&nbsp;&nbsp;
      <Link className="link" state={{ position: index+1 }} to={`/attendees/${attendee._id}`} style={{ color: "#f6ff00"}}>
      {attendee.name}, {dateFormatter(attendee.date)}
      </Link>
    </div>
    
  );
}
