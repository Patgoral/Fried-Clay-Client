// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './Gallery.css'
import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay200k26.png'
import SocialLinks from '../components/SocialLinks/SocialLinks'

export default function Gallery() {




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
	
						


						<a className="link" href="https://bikepacking.com/news/2021-fried-clay-200k-event-recap/" target="_blank" rel="noopener noreferrer">
							2021 Bikepacking.com Article
						</a>
	
						
					</div>
			</div>
			<SocialLinks />
		</div>
		
	)
}
