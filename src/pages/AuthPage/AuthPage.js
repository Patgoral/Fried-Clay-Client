import "./AuthPage.css"
import SignUpForm from '../components/SignUpForm/SignUpForm'
import LoginForm from '../components/LoginForm/LoginForm'
import { useState } from 'react'

export default function AuthPage({ user, setUser }) {
	const [signUpModal, setSignUpModal] = useState('')
	return (
		<div className='auth-container'>
			<div className='header-container'>
				<div className='logo'>
				</div>
			</div>
			<div className='login-container'>
				<div className='sign-in-form'>
					<h2 className="login-header">TRACKR Leaderboard App</h2>
					<div className="h-divider"></div>
					<SignUpForm setUser={setUser} user={user}
						signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
					<LoginForm setUser={setUser}
						signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
				</div>
			</div>
		</div>
	)
}
