import './AccessPage.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../../images/fc27logo2.png'

export default function AccessPage() {
	const [input, setInput] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	function handleAccessToken(event) {
		event.preventDefault()
		const secretCodes = ['bigpat', process.env.REACT_APP_SECRETCODE]
			.filter(Boolean)
			.map((code) => code.toLowerCase())
		const adminCode = (process.env.REACT_APP_ADMINCODE || '').toLowerCase()
		const entered = input.trim().toLowerCase()

		if (secretCodes.includes(entered)) {
			navigate('/register')
		} else if (adminCode && entered === adminCode) {
			navigate('/update')
		} else {
			setError('Invalid Access Code')
		}
	}

	function handleInputChange(event) {
		setInput(event.target.value)
		if (error) setError('')
	}

	return (
		<div className="container access-page">
			<div className="access-card">
				<Link className="link access-logo-link" to="/">
					<img className="access-logo" alt="Fried Clay 200k" src={logo} />
				</Link>

				<h1 className="access-title">Submit Your Time</h1>
				<p className="access-warning">
					Only submit a result if you completed the entire route!
				</p>

				<form className="access-form" onSubmit={handleAccessToken}>
					<label className="access-label" htmlFor="access-code">
						Access code
					</label>
					<input
						id="access-code"
						className="access-input"
						placeholder="Enter Access Code"
						name="access"
						autoComplete="off"
						value={input}
						onChange={handleInputChange}
					/>
					<p className="access-error" role="alert">
						{error}
					</p>
					<button className="access-submit" type="submit">
						Continue
					</button>
				</form>

				<Link className="access-back" to="/">
					Back to home
				</Link>
			</div>
		</div>
	)
}
