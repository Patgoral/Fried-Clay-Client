import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/dateFormatter";

export default function AttendeeCard({ attendee, index }) {
   

  return (
    <div className='attendee-card'>
      {index+1}
      <Link state={{ position: index+1 }} className='link' to={`/attendees/${attendee._id}`}>
      {attendee.name}, {dateFormatter(attendee.date)}
      </Link>
    </div>
  );
}
