import { getToken } from './users-services'
import FormData from 'form-data';
const BASE_URL = 'http://localhost:3000/api/users'

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
	const token = getToken()
	if (token) {
		options.headers = options.headers || {}
		options.headers.Authorization = `Bearer ${token}`
	}
	const res = await fetch(url, options)
	if (res.ok) {
		return res.json()
	} else {
		throw new Error('Bad Request')
	}
}


// export async function sendFormRequest(url, method = 'GET', payload = null) {
// 	const options = { method };
// 	const token = getToken();
// 	if (token) {
// 	  options.headers = { Authorization: `Bearer ${token}` };
// 	}
  
// 	if (payload) {
// 	  const formData = new FormData();
// 	  Object.keys(payload).forEach((key) => {
// 		if (key === 'image') {
// 		  formData.append(key, payload[key]);
// 		} else {
// 		  formData.append(key, JSON.stringify(payload[key]));
// 		}
// 	  });
  
// 	  options.body = formData;
// 	}
  
// 	const res = await fetch(url, {
// 	  ...options,
// 	  headers: {
// 		...options.headers,
// 		...formData.getHeaders(),
// 	  },
// 	});
  
// 	if (res.ok) {
// 	  const contentType = res.headers.get('content-type');
// 	  if (contentType && contentType.indexOf('application/json') !== -1) {
// 		console.log(await res.json());		
// 	  } else {
// 		console.log(await res.text());
// 	  }
// 	} else {
// 	  throw new Error('Bad Request');
// 	}
//   }
export async function checkToken() {
	return sendRequest(BASE_URL + '/check-token')
}
