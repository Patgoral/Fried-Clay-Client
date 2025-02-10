// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './EventPage.css'

import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

export default function EventPage() {



	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<div className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</div>

				
				<br></br>
				<div className="button-div">
					
				<a className="link" href="https://www.eventbrite.com/e/fried-clay-200k-2025-tickets-1046921529477" target="_blank" rel="noopener noreferrer">
					Register
				</a>

				<Link className="link" to="/2025">
					 2025 Results
					</Link>

					<Link className="link" to="/2024">
					 2024 Results
					</Link>

					
				</div>
			</div>
			<div className="event-page-list-container">
				<iframe width="560" height="315" 
					src="https://www.youtube.com/embed/G6uKLOmRxuE" 
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen>
				</iframe>
			</div>
		</div>
	)
}
