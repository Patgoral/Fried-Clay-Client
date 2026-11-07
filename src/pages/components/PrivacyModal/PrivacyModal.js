import { useEffect } from 'react'
import './PrivacyModal.css'

const CONTACT_EMAIL = 'patpattersonridesbikes@gmail.com'

export default function PrivacyModal({ onClose }) {
	useEffect(() => {
		const onKeyDown = (event) => {
			if (event.key === 'Escape') onClose()
		}
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = previousOverflow
		}
	}, [onClose])

	return (
		<div className="privacy-modal-overlay" onClick={onClose}>
			<div
				className="privacy-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="privacy-modal-title"
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type="button"
					className="privacy-modal-close"
					aria-label="Close privacy policy"
					onClick={onClose}
				>
					&times;
				</button>

				<div className="privacy-modal-body">
					<h2 id="privacy-modal-title">Privacy Policy</h2>
					<p className="privacy-updated">Last updated: November 7, 2026</p>

					<p>
						This site is run by Fried Clay LLC, 2620 Rockcliff Rd. SE, Atlanta,
						GA 30316. This policy explains what information we collect for the
						Fried Clay 200K and what we do with it.
					</p>

					<h3>What we collect</h3>
					<ul>
						<li>
							<strong>Result submissions.</strong> When you submit a time, we
							store the name you enter, your gender, whether you rode geared or
							ungeared, and the finish time calculated from the GPX file you
							upload. We also store the route data needed to show your ride on
							the map.
						</li>
						<li>
							<strong>Photos.</strong> Some past results include a rider photo
							that was supplied for the results page.
						</li>
						<li>
							<strong>Emails.</strong> If you contact us, for example to fix a
							timing error, we keep the email and any files you send so we can
							resolve the issue.
						</li>
					</ul>

					<h3>What is public</h3>
					<p>
						Results are shown publicly on this site. That includes your name,
						gender category, geared or ungeared status, finish time, and your
						route on the map. Please enter only a name you are comfortable
						sharing; a nickname is fine.
					</p>

					<h3>Registration and other services</h3>
					<p>
						Registration is handled by Eventbrite and merchandise by Big
						Cartel. Those services collect their own information under their own
						privacy policies, and we do not receive your payment details. The
						registration page embeds Eventbrite's checkout. This site also links
						to Instagram and Facebook and may embed videos. These services may
						use cookies or tracking technologies when loaded or used.
					</p>

					<h3>Cookies and tracking</h3>
					<p>
						We do not use our own advertising trackers or sell your information.
						Third-party services may use their own tracking technologies.
					</p>

					<h3>How long we keep it</h3>
					<p>
						Past results stay on the site as part of the event's history. You
						can ask us to change or remove your entry at any time.
					</p>

					<h3>Your requests</h3>
					<p>
						To correct, update, or remove your name, photo, or result, or to ask
						what we have stored about you, email{' '}
						<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or write to
						Fried Clay LLC, 2620 Rockcliff Rd. SE, Atlanta, GA 30316. We will
						respond as soon as we can.
					</p>

					<h3>Changes</h3>
					<p>
						If this policy changes, we will update the date at the top of this
						policy.
					</p>
				</div>
			</div>
		</div>
	)
}
