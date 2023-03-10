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
}


export function getUser() {
    const token = localStorage.getItem('token')
    if (token) {
      return token
    } else {
      return null
    }
  }

export function logOut() {
    localStorage.removeItem('token')
}


export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem("token", token.user.token)
    console.log(token.user.token)
    return getUser()
}

export function checkToken() {
return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
}