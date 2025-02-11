// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './PastResults.css'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

export default function PastResults() {






	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<div className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</div>

		
				<br></br>
				<div className="button-div">
	
					<Link className="link" to="/EventPage">
					 	Past Results
					</Link>
					
				</div>
			</div>
			<div className="event-page-list-container">
				{/* <div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<p>Click a name to view details</p>

					<div className="message-container">{messagecontainer}</div>

					{!isPageLoaded && (
						<div className="lds-roller">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					)}

					<div className="list-container-overflow">{attendeeList}</div>
				</div> */}
				 <iframe src="https://www.eventbrite.com/e/fried-clay-200k-2025-tickets-1046921529477" width="100%" height="600" />
			</div>
		</div>
	)
}
