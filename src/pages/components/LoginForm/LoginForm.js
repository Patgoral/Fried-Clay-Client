import { useState } from 'react'
import { logIn } from '../../../utilities/users-services'
import "./LoginForm.css"

export default function LoginForm({ setUser, signUpModal }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')

    function handleChange(e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const userToLogIn = await logIn(credentials)
            setUser(userToLogIn)
        } catch {
            setError('Error Logging In')
        }
    }
    
    return (
        <div className='form-container' style={{display: `${signUpModal}`}}>
            <form autoComplete='off' onSubmit={handleSubmit}>
                <label className='login-labels'>Email</label>
                <input
                    type='email'
                    name='email'
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <label className='login-labels'>Password</label>
                <input
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Sign In</button>
            </form>
            <p className='error-message' >{error}</p>
        </div>
    )
}