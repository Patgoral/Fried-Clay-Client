import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/dateFormatter";
import './AttendeeCard.css'

export default function AttendeeCard({ attendee, index }) {

  const getGenderSuffix = (genderPosition) => {
    if (genderPosition === "Male 1") return "1st Male";
    if (genderPosition === "Female 1") return "1st Female";
    if (genderPosition === "Non-Binary 1") return "1st Non-Binary";
    return "";
  };
  
  const genderSuffix = attendee?.genderPosition ? getGenderSuffix(attendee.genderPosition) : "";
  

  return (
    <div className='attendee-card'>
      {index + 1}&nbsp;&nbsp;&nbsp;
      <Link 
        className="link" 
        state={{ position: index + 1, genderPosition: attendee.genderPosition }}
        to={`/attendees/${attendee._id}`} 
        style={{ color: "#dbafea" }}
      >
        {attendee.name}, {dateFormatter(attendee.date)} 
        {genderSuffix ? <span style={{ color: "yellow" }}> - {genderSuffix}</span> : ""}
      </Link>
    </div>
  );
  