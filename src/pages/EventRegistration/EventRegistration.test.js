import { act, fireEvent, render, screen, cleanup, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { loadEventbriteWidget } from '../../utilities/eventbrite-widget'
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
	document.querySelectorAll('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
		.forEach((script) => script.remove())
	jest.restoreAllMocks()
})

test('initializes the requested checkout and keeps a direct fallback link', async () => {
	renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	fireEvent.load(script)

	await waitFor(() => expect(createWidget).toHaveBeenCalledWith({
		widgetType: 'checkout',
		eventId: '2004102106349',
		iframeContainerId: 'eventbrite-widget-container-2004102106349',
		iframeContainerHeight: 700,
		themeSettings: {
			brandColor: '#7c468b',
			fontColor: '#000000',
			background: '#ede9e9',
		},
	}))
	expect(screen.getByRole('link', { name: 'Register on Eventbrite' }).href)
		.toContain('2004102106349')
	const iframe = document.querySelector('#eventbrite-widget-container-2004102106349 iframe')
	expect(iframe.title).toBe('Eventbrite registration checkout')
	fireEvent.load(iframe)
	expect(screen.getByRole('status').textContent).toContain('requires HTTPS')
})

test('reports an initialization failure when no iframe is created', async () => {
	jest.spyOn(console, 'error').mockImplementation(() => {})
	window.EBWidgets = { createWidget: jest.fn() }
	renderRegistration()
	expect((await screen.findByRole('alert')).textContent).toContain('could not be loaded')
})

test('reports script load failures and offers the Eventbrite link', async () => {
	jest.spyOn(console, 'error').mockImplementation(() => {})
	renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	fireEvent.error(script)

	expect((await screen.findByRole('alert')).textContent).toContain('could not be loaded')
	expect(screen.getByRole('link', { name: 'Register on Eventbrite' })).toBeTruthy()
})

test('reuses the widget library after navigating back to the page', async () => {
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	const { unmount } = renderRegistration()
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
	unmount()
	renderRegistration()
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(2))
})

test('shares the home preload and initializes after navigating to checkout', async () => {
	const preload = loadEventbriteWidget()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	renderRegistration()
	expect(document.querySelectorAll('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]').length).toBe(1)
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	fireEvent.load(script)
	await act(async () => { await preload })
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
})

test('does not initialize the checkout after leaving while the script loads', async () => {
	const { unmount } = renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	unmount()
	const createWidget = jest.fn()
	window.EBWidgets = { createWidget }
	await act(async () => {
		fireEvent.load(script)
		await Promise.resolve()
	})
	expect(createWidget).not.toHaveBeenCalled()
})

test('retries a failed preload when checkout is opened', async () => {
	const preload = loadEventbriteWidget()
	fireEvent.error(document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]'))
	await expect(preload).rejects.toThrow('Unable to load')
	renderRegistration()
	const script = document.querySelector('script[src="https://www.eventbrite.com/static/widgets/eb_widgets.js"]')
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	fireEvent.load(script)
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
})
