import { dateFormatter } from "../../utils/dateFormatter";
import './AttendeeCard.css';

export default function AttendeeCard({ attendee, position }) {

  const getSuffix = (attendee) => {
    const gender = attendee?.genderPosition;
    const geared = attendee?.gearedPosition;

    const genderMap = {
      "Male": "M",
      "Female": "F",
      "Non-Binary": "NB"
    };

    const gearedMap = {
      "SS": "SS",
      "Fixed": "Fixed"
    };

    const genderParts = gender?.split(" ");
    const gearedParts = geared?.split(" ");

    const genderCode = genderParts && genderParts[1] === "1" ? genderMap[genderParts[0]] : null;
    const gearedCode = gearedParts && gearedParts[1] === "1" ? gearedMap[gearedParts[0]] : null;

    if (genderCode && gearedCode) return `1st ${genderCode}/${gearedCode}`;
    if (genderCode) return `1st ${genderParts[0]}`;
    if (gearedCode) return `1st ${gearedCode}`;

    return "";
  };

  const suffix = getSuffix(attendee);

  return (
    <div className='attendee-card'>
      {position}&nbsp;&nbsp;&nbsp;
      <span style={{ color: "#f9f9f9" }}>
        {attendee.name}, {attendee.finishTime ?? attendee.date
        ? dateFormatter(attendee.finishTime ?? attendee.date)
        : "TIME ERROR"}
        {suffix && <span style={{ color: "yellow" }}> - {suffix}</span>}
      </span>
    </div>
  );
}