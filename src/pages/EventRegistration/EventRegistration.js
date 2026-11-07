import { useEffect, useState } from 'react'
import EventNavBar, { REGISTRATION_URL } from '../components/EventNavBar/EventNavBar'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import { loadEventbriteWidget } from '../../utilities/eventbrite-widget'
import './EventRegistration.css'

const WIDGET_CONTAINER_ID = 'eventbrite-widget-container-2004102106349'

export default function EventRegistration() {
	const [widgetStatus, setWidgetStatus] = useState('loading')
	const isHttps = window.location.protocol === 'https:'

	useEffect(() => {
		let cancelled = false
		let iframe
		const timeout = window.setTimeout(() => {
			if (!cancelled) setWidgetStatus('slow')
		}, 10000)

		function handleIframeLoad() {
			if (cancelled) return
			window.clearTimeout(timeout)
			setWidgetStatus('ready')
		}

		function createWidget(widget) {
			if (cancelled) return
			try {
				widget.createWidget({
					widgetType: 'checkout',
					eventId: '2004102106349',
					iframeContainerId: WIDGET_CONTAINER_ID,
					iframeContainerHeight: 700,
					themeSettings: {
						brandColor: '#7c468b',
						fontColor: '#000000',
						background: '#ede9e9',
					},
				})
				iframe = document.getElementById(WIDGET_CONTAINER_ID).querySelector('iframe')
				if (!iframe) throw new Error('Eventbrite checkout iframe was not created')
				iframe.title = 'Eventbrite registration checkout'
				iframe.addEventListener('load', handleIframeLoad)
			} catch (error) {
				console.error('Unable to initialize Eventbrite checkout:', error)
				window.clearTimeout(timeout)
				setWidgetStatus('error')
			}
		}

		function handleScriptError(error) {
			if (cancelled) return
			console.error('Unable to load the Eventbrite checkout script:', error)
			window.clearTimeout(timeout)
			setWidgetStatus('error')
		}

		loadEventbriteWidget().then(createWidget, handleScriptError)

		return () => {
			cancelled = true
			window.clearTimeout(timeout)
			if (iframe) iframe.removeEventListener('load', handleIframeLoad)
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
				{isHttps && widgetStatus === 'loading' && <p role="status">Loading Eventbrite checkout...</p>}
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
