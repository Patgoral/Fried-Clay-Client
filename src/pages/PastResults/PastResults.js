// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import '../ArchivePages.css'
import { Link } from 'react-router-dom'
import EventNavBar from '../components/EventNavBar/EventNavBar'
import SocialLinks from '../components/SocialLinks/SocialLinks'

export default function PastResults() {

// const targetDate = new Date("2026-03-29T08:00:00-04:00");
// const now = new Date();
const currentDate = new Date()

const startDate = new Date('2027-03-20T12:00:00Z')

const isWithinDateRange = currentDate >= startDate;
const shouldShowRegister = currentDate < new Date('2027-03-20');


	return (
		<div className="container event-page archive-page past-results-page">
			<EventNavBar isWithinDateRange={shouldShowRegister} activeItem="past-results" />

			<main className="past-results-content">
				<div className="past-results-toolbar">
					<h1>Past Results</h1>
				</div>
				<div className="past-results-grid">
					{isWithinDateRange && (
						<Link className="archive-result-link" to="/2027">
							<span className="archive-result-year">2027</span>
							<span className="archive-result-label">Results</span>
						</Link>
					)}
					<Link className="archive-result-link" to="/2026">
						<span className="archive-result-year">2026</span>
						<span className="archive-result-label">Results</span>
					</Link>
					<Link className="archive-result-link" to="/2025">
						<span className="archive-result-year">2025</span>
						<span className="archive-result-label">Results</span>
					</Link>
					<Link className="archive-result-link" to="/2024">
						<span className="archive-result-year">2024</span>
						<span className="archive-result-label">Results</span>
					</Link>
					<Link className="archive-result-link" to="/2023">
						<span className="archive-result-year">2023</span>
						<span className="archive-result-label">Results</span>
					</Link>
						<a className="archive-result-link" href="https://docs.google.com/spreadsheets/d/1oheaS0YIwqe8kJJMTjZofXlFKUJp877x/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							<span className="archive-result-year">2022</span>
							<span className="archive-result-label">Results</span>
						</a>
						<a className="archive-result-link" href="https://docs.google.com/spreadsheets/d/1qllYZgAVuyfyhEMk4Bc1y8SBInb_F_sX/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							<span className="archive-result-year">2021</span>
							<span className="archive-result-label">Results</span>
						</a>
						<a className="archive-result-link" href="https://docs.google.com/spreadsheets/d/1snno4L1Cueq78q9c3oLrKJYHn254H7RR/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							<span className="archive-result-year">2019</span>
							<span className="archive-result-label">Results</span>
						</a>
				</div>
			</main>

			<SocialLinks />
		</div>
		
	)
}
