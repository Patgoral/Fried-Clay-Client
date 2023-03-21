import './App.css'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import RegistrationPage from '../Registration/RegistrationPage'
import AuthPage from '../AuthPage/AuthPage'
import NavBar from '../components/NavBar/NavBar'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'
import AccessPage from '../AccessPage/AccessPage'

function App() {
	return (
		<main className="App">
			<>
				<Routes>
					<Route path="/" element={<EventPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/update" element={<UpdatePage />} />
					<Route path="/access" element={<AccessPage />} />
					<Route path="/attendees/:id" element={<AttendeeDetail />} />
					<Route path="*" element={<EventPage />} />
					<Route path="/attendees/*" element={<EventPage />} />
					<Route path="/access/*" element={<EventPage />} />
					<Route path="/register/*" element={<EventPage />} />


					

				</Routes>
			</>
		</main>
	)
}

export default App
