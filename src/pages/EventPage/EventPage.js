// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './EventPage.css'

import { Link } from 'react-router-dom'
import logo from '../../images/FriedClay5_v1-01.png'

export default function EventPage() {

	const currentDate = new Date();
	const startDate = new Date('2025-10-22');
	const endDate = new Date('2025-03-22');

	const isWithinDateRange = currentDate >= startDate && currentDate <= endDate;

	return (
		<div className="event-page">
			<div className="event-page-container-top">
				<div className="link" to="/">
					<img width="300px" alt="logo" src={logo} />
				</div>

				
				<br></br>
				<div className="button-div">
				{isWithinDateRange ? (
					<a
						className="link"
						href="https://www.eventbrite.com/e/fried-clay-200k-2025-tickets-1046921529477"
						target="_blank"
						rel="noopener noreferrer"
					>
						Register
					</a>
				) : null}
							

				<Link className="link" to="/PastResults">
				  Past Results
				</Link>

				<a className="link" href="mailto:patpattersonridesbikes@gmail.com" rel="noopener noreferrer">
				Contact
				</a>



				

					
				</div>
			</div>
			<div className="event-page-list-container">
				<iframe className="video-frame" 
					src="https://www.youtube.com/embed/G6uKLOmRxuE" 
					title="YouTube video player" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen>
				</iframe>
				<div className="event-desc">
				Fried Clay is a <b>self-supported</b> endurance gravel event that takes you through 130ish miles of the Chattahoochee-Oconee National Forest. Expect a grueling trip down some of the best gravel roads middle Georgia has to offer. The route combines the popular Red Clay Ramble and Fried Green Tomatoes routes plus a lot of weird junk I added to make it even harder! You will need a GPS or a smart phone to navigate as there will be no markings on the route at all! Expect long stretches of gravel, singletrack, water crossings, horse trails, and mud. If you've been thinking about giving this whole endurance gravel/bikepacking thing a shot, this is the perfect event. Some riders will choose to race, while others will party pace it. This event can be the perfect opportunity to try a longer gravel race, or a tough overnighter if you want to bikepack it. If you chose to camp on the route, there will be marked primitive campsites on the route guide you will receive via e-mail before the event.
					<br></br>
					<br></br>
					Your registration gets you the GPX route, an in-depth route guide, and a limited edition enamel pin.
					<br></br>
					<br></br>
					We will have a camp setup the night before if you choose to come down the night before!
					<br></br>
					<br></br>
					You will receive more details via email once registered.
					<br></br>
					<br></br>
					<b>This event will take place rain or shine!</b>
					<br></br>
				</div>
			</div>
		</div>
	)
}
