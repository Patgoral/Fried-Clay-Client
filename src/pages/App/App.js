import './App.css'
import { Routes, Route } from 'react-router-dom'
import UpdatePage from '../UpdatePage/UpdatePage'
import EventPage from '../EventPage/EventPage'
import Results2023 from '../Results2023/Results2023'
import Results2024 from '../Results2024/Results2024'
import Results2025 from '../Results2025/Results2025'
import Results2026 from '../Results2026/Results2026'
import Results2027, { isResults2027Live } from '../Results2027/Results2027'
import PastResults from '../PastResults/PastResults'
import Gallery from '../Gallery/Gallery'
import RegistrationPage from '../Registration/RegistrationPage'
import EventRegistration from '../EventRegistration/EventRegistration'
// import NavBar from '../components/NavBar/NavBar'
import AttendeeDetail from '../components/AttendeeDetail/AttendeeDetail'
import AccessPage from '../AccessPage/AccessPage'
import PixelBackground from '../components/PixelBackground/PixelBackground'
import ClickSparkle from '../components/ClickSparkle/ClickSparkle'
import RouteEffects from '../components/RouteEffects/RouteEffects'
import NotFound from '../NotFound/NotFound'

function App() {

const isWithinDateRange = isResults2027Live()

	return (
		<>
		<PixelBackground />
		<ClickSparkle />
		<RouteEffects />
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
					<Route path="/gallery" element={<Gallery/>} />
					<Route path="/register" element={<EventRegistration />} />
					<Route path="/submit-time" element={<RegistrationPage />} />
					<Route path="/update" element={<UpdatePage />} />
					<Route path="/access" element={<AccessPage />} />
					<Route path="/attendees/:id" element={<AttendeeDetail />} />
					<Route path="*" element={<NotFound />} />

				</Routes>
			</>
		</main>
		</>
	)
}

export default App
