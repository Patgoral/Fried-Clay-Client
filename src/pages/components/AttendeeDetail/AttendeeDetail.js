import "./AttendeeDetail.css"
import { useParams } from "react-router-dom";
// import { useState, useEffect } from 'react'


export default function AttendeeDetailPage({ attendees }) {
  const { attendeeName } = useParams();
  
  const attendee = attendees.find((attendee) => attendee.name === attendeeName);

 
  return (
    <div className="AttendeeDetailPage">
     <h2>Title: {attendee.name}</h2>
    </div>
  );
}
