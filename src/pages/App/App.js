import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import RegistrationPage from '../Registration/RegistrationPage'
// import AuthPage from '../AuthPage/AuthPage'
// import NavBar from '../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-services'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'

function App() {
	const [user, setUser] = useState(getUser())


	return (
		<main className="App">
			
				<>
					<Routes>
						<Route path="/" element={<EventPage />} />
						<Route
							path="/register"
							element={
								<RegistrationPage
									
								/>
							}
						/>
						<Route path="/update" element={<UpdatePage />} />
            <Route path="/attendees/:id" element={<AttendeeDetail />} />
					</Routes>
				</>
		
		
		</main>
	)
}

export default App
