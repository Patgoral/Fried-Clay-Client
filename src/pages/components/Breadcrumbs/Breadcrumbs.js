import { Link } from 'react-router-dom'
import './Breadcrumbs.css'

// items: [{ label, to? }]; the last item is the current page.
export default function Breadcrumbs({ items }) {
	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ol>
				{items.map((item, i) => {
					const isLast = i === items.length - 1
					return (
						<li key={item.label}>
							{isLast || !item.to ? (
								<span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
							) : (
								<Link to={item.to}>{item.label}</Link>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
