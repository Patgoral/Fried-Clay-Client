import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EventRegistration from './EventRegistration'

function renderRegistration() {
	return render(
		<MemoryRouter>
			<EventRegistration />
		</MemoryRouter>
	)
}

afterEach(() => {
	cleanup()
	delete window.EBWidgets
	jest.restoreAllMocks()
})

test('initializes the requested checkout and keeps a direct fallback link', () => {
	renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	fireEvent.load(script)

	expect(createWidget).toHaveBeenCalledWith({
		widgetType: 'checkout',
		eventId: '2004102106349',
		iframeContainerId: 'eventbrite-widget-container-2004102106349',
		iframeContainerHeight: 700,
		themeSettings: {
			brandColor: '#7c468b',
			fontColor: '#000000',
			background: '#ede9e9',
		},
	})
	expect(screen.getByRole('link', { name: 'Register on Eventbrite' }).href)
		.toContain('2004102106349')
	const iframe = document.querySelector('#eventbrite-widget-container-2004102106349 iframe')
	expect(iframe.title).toBe('Eventbrite registration checkout')
	fireEvent.load(iframe)
	expect(screen.getByRole('status').textContent).toContain('requires HTTPS')
})

test('reports an initialization failure when no iframe is created', () => {
	jest.spyOn(console, 'error').mockImplementation(() => {})
	window.EBWidgets = { createWidget: jest.fn() }
	renderRegistration()
	expect(screen.getByRole('alert').textContent).toContain('could not be loaded')
})

test('reports script load failures and offers the Eventbrite link', () => {
	jest.spyOn(console, 'error').mockImplementation(() => {})
	renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	fireEvent.error(script)

	expect(screen.getByRole('alert').textContent).toContain('could not be loaded')
	expect(screen.getByRole('link', { name: 'Register on Eventbrite' })).toBeTruthy()
})

test('reuses the widget library after navigating back to the page', () => {
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	const { unmount } = renderRegistration()
	unmount()
	renderRegistration()
	expect(createWidget).toHaveBeenCalledTimes(2)
})

test('removes the pending script when leaving the page', () => {
	const { unmount } = renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	unmount()
	expect(document.body.contains(script)).toBe(false)
})
