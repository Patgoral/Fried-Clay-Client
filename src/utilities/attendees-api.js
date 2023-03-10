import {sendRequest, sendRequestToDelete} from './users-api'

const BASE_URL = 'http://127.0.0.1:8000/attendees/'

export function showAttendees() {
    return sendRequest('http://127.0.0.1:8000/attendeesall/')
}

export function indexAttendees() {
    return sendRequest(`${BASE_URL}/`)
}

export function addAttendee(data){
    console.log(data)
    return sendRequest(`${BASE_URL}`, 'POST', data)
}

export function updateAttendee(participantId, participant){
    return sendRequest(`${BASE_URL}/${participantId}`, 'PATCH', {participant})
}

export function removeAttendee(participantId){
    return sendRequestToDelete(`${BASE_URL}/${participantId}`, 'DELETE')
}