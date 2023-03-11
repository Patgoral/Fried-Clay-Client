import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import RegistrationPage from '../Registration/RegistrationPage'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../components/NavBar/NavBar'

import { getUser } from '../../utilities/users-services'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'

function App() {
	const [user, setUser] = useState(getUser())
	const [attendee, setAttendee] = useState({
		name: '',
		date: ''
		// time: '',
	})

	return (
		<main className="App">
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
					<Routes>
						<Route path="/" element={<EventPage />} />
						<Route
							path="/register"
							element={
								<RegistrationPage
									attendee={attendee}
									setAttendee={setAttendee}
								/>
							}
						/>
						<Route path="/update" element={<UpdatePage />} />
            <Route path="/attendeeDetail/:attendeeName" element={<AttendeeDetail />} />
					</Routes>
				</>
			) : (
				<AuthPage setUser={setUser} user={user} />
			)}
		</main>
	)
}

export default App
