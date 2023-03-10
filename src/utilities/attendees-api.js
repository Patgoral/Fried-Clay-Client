import {sendRequest, sendRequestToDelete} from './users-api'

const BASE_URL = 'http://127.0.0.1:8000/attendees/'

export function showParticipants() {
    return sendRequest(BASE_URL)
}

export function indexParticipants() {
    return sendRequest(`${BASE_URL}/`, 'POST')
}

export function addParticipant(data){
    return sendRequest(`${BASE_URL}/`, 'POST', data)
}

export function updateParticipant(participantId, participant){
    return sendRequest(`${BASE_URL}/${participantId}`, 'PATCH', {participant})
}

export function removeParticipant(participantId){
    return sendRequestToDelete(`${BASE_URL}/${participantId}`, 'DELETE')
}