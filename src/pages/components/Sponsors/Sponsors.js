import lnc from '../../../images/sponsors/LNC-logo.webp'
import rg from '../../../images/sponsors/rg.png'
import f369 from '../../../images/sponsors/f369.png'
import lmnt from '../../../images/sponsors/LMNT.png'

export default function Sponsors() {
	return (
		<div className="sponsors-section">

			<h2 className="sponsors-title">
				Special Thanks to our 2026 Sponsors
			</h2>

			<div className="sponsors-container">
				<a
					className="sponsor-card"
					href="https://www.loosenutscycles.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="Loose Nuts Cycles" src={lnc} />
				</a>

				<a
					className="sponsor-card"
					href="https://www.formula369.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="Formula 369" src={f369} />
				</a>

				<a
					className="sponsor-card"
					href="https://drinklmnt.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="LMNT" src={lmnt} />
				</a>

				<a
					className="sponsor-card"
					href="https://www.rockgeist.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img alt="Rockgeist" src={rg} />
				</a>
			</div>

		</div>
	)
}