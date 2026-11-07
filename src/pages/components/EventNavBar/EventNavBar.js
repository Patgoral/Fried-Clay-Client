import { Link } from 'react-router-dom'
import logo from '../../../images/fc27logo2.png'
import './EventNavBar.css'

export const REGISTRATION_URL = 'https://www.eventbrite.com/e/fried-clay-200k-2027-tickets-2004102106349?aff=oddtdtcreator&keep_tld=true'
export const isRegistrationOpen = () => new Date() < new Date('2027-03-20')

export default function EventNavBar({
	isWithinDateRange = isRegistrationOpen(),
	activeItem,
	showAdminShortcut = false,
	logoTo = '/',
}) {
	const pastResultsIsActive = activeItem === 'past-results'
	const registerIsActive = activeItem === 'register'
	const pastResultsClassName = `link secondary-action${pastResultsIsActive ? ' is-active' : ''}`

	return (
		<header className="event-site-header">
			<Link id="logo-container" className="link" to={logoTo}>
				<img className="event-logo" alt="Fried Clay 200k" src={logo} />
			</Link>

			{showAdminShortcut && (
				<Link
					className="event-site-admin-shortcut"
					to="/2027"
					onClick={() => localStorage.setItem('adminOverride', 'true')}
					aria-label="Open 2027 admin results"
				/>
			)}

			<nav className="event-nav-actions" aria-label="Main navigation">
				{isWithinDateRange && (
					<Link
						className={`link secondary-action${registerIsActive ? ' is-active' : ''}`}
						to="/register"
						aria-current={registerIsActive ? 'page' : undefined}
					>
						Register
					</Link>
				)}

				<Link
					className={pastResultsClassName}
					to="/PastResults"
					aria-current={pastResultsIsActive ? 'page' : undefined}
				>
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
				>
					Contact
				</a>
			</nav>
		</header>
	)
}