import { getToken } from './users-services'
const BASE_URL = 'https://fried-clay-server.onrender.com/api/users'

export async function signUp(userData) {
	console.log(userData)
	return sendRequest(BASE_URL, 'POST', userData)
}

export async function logIn(credentials) {
	console.log(credentials)
	return sendRequest(BASE_URL + '/login', 'POST', credentials)

}
export async function sendRequestToDelete(url, method = 'DELETE') {
	const options = { method }
	const token = getToken()
	if (token) {
		options.headers = options.headers || {}
		options.headers.Authorization = `Bearer ${token}`
	}
	return await fetch(url, options)
}

export async function sendRequest(url, method = 'GET', payload = null) {
	const options = { method }
	if (payload) {
		options.headers = { 'Content-Type': 'application/json' }
		options.body = JSON.stringify(payload)
	}

	const res = await fetch(url, options)
	if (res.ok) {
		return res.json()
	} else {
		throw new Error('Bad Request')
	}
}


export async function sendFormRequest(url, method = 'GET', payload = null) {
	const options = { method }
  
	if (payload instanceof FormData) {
	  options.body = payload
	} else if (payload) {
	  options.headers = { 'Content-Type': 'application/json' }
	  options.body = JSON.stringify(payload)
	}

  
	const res = await fetch(url, options)
  
	if (res.ok) {
	  return res.json()
	} else {
	  throw new Error('Bad Request')
	}
  }



export async function checkToken() {
	return sendRequest(BASE_URL + '/check-token')
}
