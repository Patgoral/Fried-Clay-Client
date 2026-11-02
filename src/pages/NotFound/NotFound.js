import { Link } from 'react-router-dom'
import EventNavBar from '../components/EventNavBar/EventNavBar'
import SocialLinks from '../components/SocialLinks/SocialLinks'

export default function NotFound() {
	return (
		<div className="container event-page">
			<EventNavBar />
			<div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
				<h1>Page not found</h1>
				<p style={{ color: 'var(--app-muted)' }}>That page doesn’t exist or has moved.</p>
				<p>
					<Link to="/">Home</Link> · <Link to="/PastResults">Past Results</Link>
				</p>
			</div>
			<SocialLinks />
		</div>
	)
}
