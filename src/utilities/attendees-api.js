import {sendRequest, sendRequestToDelete, sendFormRequest} from './users-api'

const BASE_URL = 'http://localhost:3000/api/attendees'

export function showAttendees() {
    return sendRequest(BASE_URL)}

export function indexAttendees() {
    return sendRequest(`${BASE_URL}/user`, 'POST')
}

export function indexEachAttendee(attendeeId){
    return sendRequest(`${BASE_URL}/${attendeeId}`)
}

export function addAttendee(data){
    console.log(data)
    return sendFormRequest(`${BASE_URL}`, 'POST', data)
}

export function updateAttendee(attendeeId, attendee){
    return sendRequest(`${BASE_URL}/${attendeeId}`, 'PATCH', {attendee})
}

export function removeAttendee(attendeeId){
    return sendRequestToDelete(`${BASE_URL}/${attendeeId}`, 'DELETE')
}

