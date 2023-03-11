import { Link } from "react-router-dom";


export default function AttendeeCard({ attendee }) {
   

  return (
    <div className='attendee-card'>
      <Link className='link' to={`/attendees/${attendee._id}`}>
     {attendee.name}, {attendee.date}
      </Link>
    </div>
  );
}
