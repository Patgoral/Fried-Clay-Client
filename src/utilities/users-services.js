import * as usersAPI from './users-api'

export async function signUp(userData) {
	const token = await usersAPI.signUp(userData)
	localStorage.setItem('token', token)
    return getUser()
}




export function getToken() {
    const token = localStorage.getItem('token')
    console.log(token)
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


export function getUser(csrfToken) {
    const token = getToken()
    if (token) {
      const payload = token.split('.')[1]
      const decodedPayload = atob(payload)
      const parsedPayload = JSON.parse(decodedPayload)
      if (csrfToken !== parsedPayload.csrfToken) {
        throw new Error('CSRF token mismatch')
      }
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
    console.log(credentials)
    return getUser()


}

export function checkToken() {
return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}