// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './EventPage.css'

import { Link } from 'react-router-dom'
import logo from '../../images/fc27logo2.png'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Sponsors from '../components/Sponsors/Sponsors'
import { useEffect } from 'react'


export default function EventPage() {

const currentDate = new Date();
const blockedStart = new Date('2027-03-20');

const isWithinDateRange = currentDate < blockedStart;
localStorage.setItem("adminOverride", "false")


	return (
		<div className="container event-page event-landing">
			<div className="event-page-container-top">
			<Link id="logo-container" className="link" to="/">
				<img className="event-logo" alt="logo" src={logo} />
			</Link>

			<Link
			to="/2027"
			onClick={() => localStorage.setItem("adminOverride", "true")}
			style={{
				position: "absolute",
				top: "5px",
				right: "5px",
				width: "20px",
				height: "20px",
				opacity: 0,
				zIndex: 10
			}}
		/>
				<div className="button-div">
				{isWithinDateRange ? (
					<a
						className="link secondary-action"
						href="https://www.eventbrite.com/e/fried-clay-200k-2026-tickets-1739216727049?aff=oddtdtcreator"
						target="_blank"
						rel="noopener noreferrer"
					>
						Register
					</a>
				) : null}
				
							

				<Link className="link secondary-action" to="/PastResults">
				  Past Results
				</Link>

				<a
					className="link secondary-action"
					href="https://friedclay200k.bigcartel.com/"
					target="_blank"
					rel="noopener noreferrer"
					>
					Merch
				</a>


				<a
					className="link secondary-action"
					href="mailto:patpattersonridesbikes@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
					>
					Contact
				</a>

				

					
				</div>
			</div>
			<div className="event-page-list-container">
			<div className="event-details">
				<h2>Cedar Creek Checking Station</h2>
				<p>Eatonton, GA</p>
				<p>03/20/2027 – 8:00 AM</p>
			</div>
			<div className="event-story">
			{isWithinDateRange ? (
									<iframe className="video-frame"
						src="https://www.youtube.com/embed/Mjfxqt8pZbw"
						title="YouTube video player" 
							frameBorder="0" 
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
							allowFullScreen>
					</iframe>
				) : null}							
			
				<div className="event-desc">
					<p>Fried Clay is a <b>self-supported</b> endurance gravel event that takes you through 130ish miles of the Chattahoochee-Oconee National Forest. Expect a grueling trip down some of the best gravel roads middle Georgia has to offer. The route combines the popular Red Clay Ramble and Fried Green Tomatoes routes plus a lot of weird junk I added to make it even harder!</p>
					<p>You will need a GPS or a smart phone to navigate as there will be no markings on the route at all. Expect long stretches of gravel, singletrack, water crossings, horse trails, and mud.</p>
					<p>If you've been thinking about giving this whole endurance gravel/bikepacking thing a shot, this is the perfect event. Some riders will choose to race, while others will party pace it. This event can be the perfect opportunity to try a longer gravel race, or a tough overnighter if you want to bikepack it. If you choose to camp on the route, there will be marked primitive campsites on the route guide you will receive via email before the event.</p>
					<p>Your registration gets you the GPX route, an in-depth route guide, and a limited edition patch.</p>
					<p>We will have a camp setup the night before if you choose to come down on Friday.</p>
					<p>You will receive more details via email once registered.</p>
					<p><b>This event will take place rain or shine.</b></p>
				</div>
			</div>


			</div>
											<Sponsors />

				<SocialLinks />

		</div>
	)
}
