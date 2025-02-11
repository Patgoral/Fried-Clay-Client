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
					<Link className="link" to="/">
						<img width="300px" alt="logo" src={logo} />
					</Link>
				</div>
		
				<br></br>
				<div className="button-div">
					
	
						<Link className="link" to="/2025">
						 2025 Results
						</Link>
	
						<Link className="link" to="/2024">
						 2024 Results
						</Link>

						<Link className="link" to="/2023">
						 2023 Results
						</Link>
	
						
					</div>
			</div>
			<div className="past-event-list-container">
		
			</div>
		</div>
	)
}
