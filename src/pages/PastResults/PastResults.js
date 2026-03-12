// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './PastResults.css'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay200k26.png'
import SocialLinks from '../components/SocialLinks/SocialLinks'

export default function PastResults() {

// const targetDate = new Date("2026-03-29T08:00:00-04:00");
// const now = new Date();
const currentDate = new Date()

const startDate = new Date('2026-03-21T12:00:00Z')

const isWithinDateRange = currentDate >= startDate;


	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<div className="link" id="logo-container" to="/">
					<Link className="link" to="/">
						<img  className="event-logo" alt="logo" src={logo} />
					</Link>
				</div>
		
				<br></br>
				<div className="button-div-results">
					
	
						
						{isWithinDateRange && (
							<Link className="link" to="/2026">
								2026 Results
							</Link>
						)}
						

						<Link className="link" to="/2025">
							2025 Results
						</Link>
	
						<Link className="link" to="/2024">
						 2024 Results
						</Link>

						<Link className="link" to="/2023">
						 2023 Results
						</Link>

						<a className="link" href="https://docs.google.com/spreadsheets/d/1oheaS0YIwqe8kJJMTjZofXlFKUJp877x/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							2022 Results
						</a>

						<a className="link" href="https://docs.google.com/spreadsheets/d/1qllYZgAVuyfyhEMk4Bc1y8SBInb_F_sX/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							2021 Results
						</a>

						<a className="link" href="https://docs.google.com/spreadsheets/d/1snno4L1Cueq78q9c3oLrKJYHn254H7RR/edit?usp=sharing&ouid=113958247060583909460&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">
							2019 Results
						</a>
	
						
					</div>
			</div>
			<SocialLinks />
		</div>
		
	)
}
