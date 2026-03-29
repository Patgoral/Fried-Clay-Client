import './App.css'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import Results2023 from '../Results2023/Results2023'
import Results2024 from '../Results2024/Results2024'
import Results2025 from '../Results2025/Results2025'
import Results2026 from '../Results2026/Results2026'
import Results2027 from '../Results2027/Results2027'
import PastResults from '../PastResults/PastResults'
import RegistrationPage from '../Registration/RegistrationPage'
// import NavBar from '../components/NavBar/NavBar'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'
import AccessPage from '../AccessPage/AccessPage'

function App() {

const currentDate = new Date()

const startDate = new Date('2027-03-20T12:00:00Z')
const endDate   = new Date('2027-03-29T12:00:00Z')

const isWithinDateRange = currentDate >= startDate && currentDate <= endDate;

	return (
		<main className="App">
			<>
				<Routes>
					{/* <Route path="/" element={<EventPage />} /> */}
					<Route path="/" element={isWithinDateRange ? <Results2027 /> : <EventPage />} />
					<Route path="/2023" element={<Results2023/>} />
					<Route path="/2024" element={<Results2024/>} />
					<Route path="/2025" element={<Results2025/>} />
					<Route path="/2026" element={<Results2026/>} />
					<Route path="/2027" element={<Results2027/>} />
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
