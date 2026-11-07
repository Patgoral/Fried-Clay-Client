import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isRegistrationOpen } from '../components/EventNavBar/EventNavBar'
import EventRegistration from './EventRegistration'

export default function EventRegistrationHost() {
	const { pathname } = useLocation()
	const isActive = pathname.toLowerCase() === '/register'
	const shouldPreload = pathname === '/' && isRegistrationOpen()
	const [started, setStarted] = useState(isActive || shouldPreload)

	useEffect(() => {
		if (isActive || shouldPreload) setStarted(true)
	}, [isActive, shouldPreload])

	if (!started && !isActive) return null

	return (
		<div className={isActive ? '' : 'event-registration-preload'} aria-hidden={!isActive}>
			<EventRegistration isActive={isActive} />
		</div>
	)
}
