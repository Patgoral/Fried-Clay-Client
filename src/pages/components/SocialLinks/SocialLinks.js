import { useState } from 'react'
import ig from '../../../images/ig_icon.png'
import fb from '../../../images/fb_icon.png'
import PrivacyModal from '../PrivacyModal/PrivacyModal'
import './SocialLinks.css'

export default function SocialLinks() {
	const [showPrivacy, setShowPrivacy] = useState(false)

	return (
		<>
			<div id="link-container">
				<a
					href="https://www.instagram.com/friedclay200k/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="Instagram" src={ig} />
				</a>

				<a
					href="https://www.facebook.com/Friedclay"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="Facebook" src={fb} />
				</a>
			</div>
			<p className="site-copyright">
				&copy; {new Date().getFullYear()} Fried Clay LLC &middot; Atlanta, GA.
				All rights reserved.{' '}
				<button
					type="button"
					className="privacy-link"
					onClick={() => setShowPrivacy(true)}
				>
					Privacy Policy
				</button>
			</p>
			{showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
		</>
	)
}