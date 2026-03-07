import ig from '../../../images/ig_icon.png'
import fb from '../../../images/fb_icon.png'

export default function SocialLinks() {
	return (
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
	)
}