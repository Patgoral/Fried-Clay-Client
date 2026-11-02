import { useEffect, useState } from 'react'
import './LoadStatus.css'

const SLOW_LOAD_MS = 4000

export default function LoadStatus({ isLoading, hasError, onRetry }) {
	const [isSlow, setIsSlow] = useState(false)

	useEffect(() => {
		setIsSlow(false)
		if (!isLoading) return undefined
		const timer = setTimeout(() => setIsSlow(true), SLOW_LOAD_MS)
		return () => clearTimeout(timer)
	}, [isLoading])

	if (isLoading) {
		return (
			<div className="load-status" role="status">
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				{isSlow && (
					<p className="load-status-text">
						Still loading. The server may be waking up, this can take a few
						seconds.
					</p>
				)}
			</div>
		)
	}

	if (hasError) {
		return (
			<div className="load-status" role="alert">
				<p className="load-status-text">
					We couldn't load the results. Please check your connection and try
					again.
				</p>
				<button type="button" className="load-status-retry" onClick={onRetry}>
					Retry
				</button>
			</div>
		)
	}

	return null
}
