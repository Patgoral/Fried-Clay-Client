import * as usersAPI from './users-api'

export async function signUp(userData) {
	const token = await usersAPI.signUp(userData)

	// for right now, this won't be a token but we will be returning one eventually
	localStorage.setItem('token', token)
    return getUser()
}




export function getToken() {
    // get the token from local storage
    // get the token's payload
    // check if the token has expired
    // if it hasn't return the token
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    // JWT's exp is express in seconds, not milliseconds, so convert
    if (parsedPayload.exp < Date.now() / 1000) {
        // Token has expired - remove it
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}



export function getUser() {
    const token = getToken()
    if (token) {
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    return parsedPayload.user
    } else {
        return null
    }
}

export function logOut() {
    localStorage.removeItem('token')
}


export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem('token', token)
    console.log('token',token)
    return getUser()


}

export function checkToken() {
return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}