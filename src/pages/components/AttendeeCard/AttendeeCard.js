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

  const eventTime = attendee.finishTime ?? attendee.date;

  const isValidYear =
    eventTime &&
    attendee.createdAt &&
    new Date(eventTime).getFullYear() === new Date(attendee.createdAt).getFullYear();

  const formattedTime = isValidYear ? dateFormatter(eventTime) : 'Time error';

  return (
    <div className="attendee-card">
      <span className="attendee-card-position">
        {position ?? '—'}
      </span>
      <span className="attendee-card-name-group">
        <span className="attendee-card-name">{attendee.name}</span>
        {suffix && <span className="attendee-card-badge">{suffix}</span>}
      </span>
      <time
        className={`attendee-card-time${isValidYear ? '' : ' is-error'}`}
        dateTime={isValidYear ? new Date(eventTime).toISOString() : undefined}
      >
        {formattedTime}
      </time>
    </div>
  );
}