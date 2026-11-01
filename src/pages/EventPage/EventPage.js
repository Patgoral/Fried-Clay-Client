// import { checkToken } from '../../utilities/users-services'
// import { useNavigate } from 'react-router-dom'
import './EventPage.css'
import EventNavBar, { REGISTRATION_URL } from '../components/EventNavBar/EventNavBar'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import Sponsors from '../components/Sponsors/Sponsors'


export default function EventPage() {

const currentDate = new Date();
const blockedStart = new Date('2027-03-20');

const isWithinDateRange = currentDate < blockedStart;
localStorage.setItem("adminOverride", "false")


	return (
		<div className="container event-page event-landing">
			<EventNavBar isWithinDateRange={isWithinDateRange} showAdminShortcut />
			<div className="event-page-list-container">
			<div className="event-details">
				<div className="event-details-copy">
					<h2>Fried Clay 200k</h2>
					<h2>
						<a
							className="event-location-link"
							href="https://maps.app.goo.gl/zFMjvRwQDw8kGrFWA"
							target="_blank"
							rel="noopener noreferrer"
						>
							Cedar Creek WMA Check Station
						</a>
					</h2>
					<p>Eatonton, GA</p>
					<p>03/20/2027 – 8:00 AM</p>
				</div>
				<iframe
					className="event-map"
					src="https://www.google.com/maps?q=33.2294205,-83.5237188&t=k&z=15&output=embed"
					title="Map showing Cedar Creek WMA Check Station"
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
			<div className="event-story">
			{isWithinDateRange ? (
				<div className="video-feature">
					<iframe
						className="video-frame"
						src="https://www.youtube.com/embed/Mjfxqt8pZbw"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
					<a
						className="event-register-button"
						href={REGISTRATION_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						Register
					</a>
				</div>
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
