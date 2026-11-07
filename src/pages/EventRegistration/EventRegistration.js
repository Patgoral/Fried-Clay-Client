import { useEffect, useState } from 'react'
import EventNavBar, { REGISTRATION_URL } from '../components/EventNavBar/EventNavBar'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import './EventRegistration.css'

const WIDGET_CONTAINER_ID = 'eventbrite-widget-container-2004102106349'

export default function EventRegistration() {
	const [widgetStatus, setWidgetStatus] = useState('loading')
	const isHttps = window.location.protocol === 'https:'

	useEffect(() => {
		let cancelled = false
		let script
		const timeout = window.setTimeout(() => {
			if (!cancelled) setWidgetStatus('slow')
		}, 10000)

		function createWidget() {
			if (cancelled) return
			try {
				if (!window.EBWidgets || typeof window.EBWidgets.createWidget !== 'function') {
					throw new Error('Eventbrite checkout is unavailable')
				}
				window.EBWidgets.createWidget({
					widgetType: 'checkout',
					eventId: '2004102106349',
					iframeContainerId: WIDGET_CONTAINER_ID,
					iframeContainerHeight: 425,
					themeSettings: {
						brandColor: '#7c468b',
						fontColor: '#000000',
						background: '#ede9e9',
					},
				})
				window.clearTimeout(timeout)
				setWidgetStatus('ready')
			} catch (error) {
				console.error('Unable to initialize Eventbrite checkout:', error)
				window.clearTimeout(timeout)
				setWidgetStatus('error')
			}
		}

		function handleScriptError() {
			if (cancelled) return
			console.error('Unable to load the Eventbrite checkout script')
			window.clearTimeout(timeout)
			setWidgetStatus('error')
		}

		if (window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
			createWidget()
		} else {
			script = document.createElement('script')
			script.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js'
			script.async = true
			script.addEventListener('load', createWidget)
			script.addEventListener('error', handleScriptError)
			document.body.appendChild(script)
		}

		return () => {
			cancelled = true
			window.clearTimeout(timeout)
			if (script) {
				script.removeEventListener('load', createWidget)
				script.removeEventListener('error', handleScriptError)
				script.remove()
			}
		}
	}, [])

	return (
		<div className="container event-registration-page">
			<EventNavBar activeItem="register" />
			<section className="event-registration-card" aria-labelledby="registration-title">
				<h1 id="registration-title">Register for Fried Clay 200K</h1>
				<p>Complete your registration securely through Eventbrite.</p>
				{!isHttps && widgetStatus !== 'error' && (
					<p role="status">Embedded checkout requires HTTPS. Please use the Eventbrite link below.</p>
				)}
				{isHttps && widgetStatus === 'loading' && <p role="status">Loading checkout...</p>}
				{isHttps && widgetStatus === 'slow' && (
					<p role="status">Checkout is taking longer than expected to load.</p>
				)}
				{widgetStatus === 'error' && (
					<p role="alert">Checkout could not be loaded here. Please use the Eventbrite link below.</p>
				)}
				<div id={WIDGET_CONTAINER_ID} className="event-registration-widget" hidden={!isHttps} />
				<p className="event-registration-fallback">
					Having trouble with checkout?{' '}
					<a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
						Register on Eventbrite
					</a>
				</p>
			</section>
			<SocialLinks />
		</div>
	)
}
