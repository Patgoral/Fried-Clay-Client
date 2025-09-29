import { dateFormatter } from "../../utils/dateFormatter";
import './AttendeeCard.css';

export default function AttendeeCard({ attendee, position }) {

  const getGenderSuffix = (genderPosition) => {
    if (genderPosition === "Male 1") return "1st Male";
    if (genderPosition === "Female 1") return "1st Female";
    if (genderPosition === "Non-Binary 1") return "1st Non-Binary";
    return "";
  };

  const genderSuffix = attendee?.genderPosition ? getGenderSuffix(attendee.genderPosition) : "";

  return (
    <div className='attendee-card'>
      {position}&nbsp;&nbsp;&nbsp;  {/* Use position here */}
      <span style={{ color: "#d3a9a9" }}>
        {attendee.name}, {dateFormatter(attendee.date)}
        {genderSuffix ? <span style={{ color: "yellow" }}> - {genderSuffix}</span> : ""}
      </span>
    </div>
  );
}
