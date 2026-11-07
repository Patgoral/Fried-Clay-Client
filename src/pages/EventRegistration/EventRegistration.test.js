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
	const createWidget = jest.fn()
	window.EBWidgets = { createWidget }
	fireEvent.load(script)

	expect(createWidget).toHaveBeenCalledWith({
		widgetType: 'checkout',
		eventId: '2004102106349',
		iframeContainerId: 'eventbrite-widget-container-2004102106349',
		iframeContainerHeight: 425,
		themeSettings: {
			brandColor: '#7c468b',
			fontColor: '#000000',
			background: '#ede9e9',
		},
	})
	expect(screen.getByRole('link', { name: 'Register on Eventbrite' }).href)
		.toContain('2004102106349')
	expect(screen.getByRole('status').textContent).toContain('requires HTTPS')
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
	const createWidget = jest.fn()
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
