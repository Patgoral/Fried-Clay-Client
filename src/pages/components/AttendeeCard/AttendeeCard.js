import { Link } from "react-router-dom";


export default function AttendeeCard({ attendee }) {
   

  return (
    <div className="AttendeeCard">
      <Link to={`/attendees/${attendee._id}`}>
      <button>{attendee.name}, {attendee.date}</button>
      </Link>
    </div>
  );
}
