import './App.css'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import Results2023 from '../Results2023/Results2023'
import Results2024 from '../Results2024/Results2024'
import Results2025 from '../Results2025/Results2025'
import PastResults from '../PastResults/PastResults'
import RegistrationPage from '../Registration/RegistrationPage'
// import NavBar from '../components/NavBar/NavBar'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'
import AccessPage from '../AccessPage/AccessPage'

function App() {

	const currentDate = new Date();
	const startDate = new Date('2025-03-17');
	const endDate = new Date('2025-04-01');
	
	const isWithinDateRange = currentDate >= startDate && currentDate <= endDate;

	return (
		<main className="App">
			<>
				<Routes>
					{/* <Route path="/" element={<EventPage />} /> */}
					<Route path="/" element={isWithinDateRange ? <Results2025 /> : <EventPage />} />
					<Route path="/2023" element={<Results2023/>} />
					<Route path="/2024" element={<Results2024/>} />
					<Route path="/2025" element={<Results2025/>} />
					<Route path="/PastResults" element={<PastResults/>} />
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
