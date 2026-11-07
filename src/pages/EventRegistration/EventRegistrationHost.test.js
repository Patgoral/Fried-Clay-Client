import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Link, MemoryRouter } from 'react-router-dom'
import EventRegistrationHost from './EventRegistrationHost'

function renderHost(path = '/') {
	return render(
		<MemoryRouter initialEntries={[path]}>
			<EventRegistrationHost />
			<Link to="/">Home</Link>
			<Link to="/register">Open registration</Link>
			<Link to="/PastResults">Other page</Link>
		</MemoryRouter>
	)
}

afterEach(() => {
	delete window.EBWidgets
	jest.restoreAllMocks()
})

test('preloads on home and preserves the same checkout across navigation', async () => {
	jest.useFakeTimers().setSystemTime(new Date('2026-11-07T12:00:00Z'))
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	const { container } = renderHost()
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
	const iframe = container.querySelector('iframe')
	expect(iframe.closest('[aria-hidden="true"]')).not.toBeNull()

	fireEvent.click(screen.getByText('Open registration'))
	expect(container.querySelector('iframe')).toBe(iframe)
	expect(iframe.closest('[aria-hidden="true"]')).toBeNull()

	fireEvent.click(screen.getByText('Other page'))
	expect(iframe.closest('[aria-hidden="true"]')).not.toBeNull()
	fireEvent.click(screen.getByText('Open registration'))
	expect(container.querySelector('iframe')).toBe(iframe)
	expect(createWidget).toHaveBeenCalledTimes(1)
	jest.useRealTimers()
})

test('loads checkout on a direct registration visit', async () => {
	const createWidget = jest.fn(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	window.EBWidgets = { createWidget }
	renderHost('/register')
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
	expect(screen.getByRole('heading', { name: 'Register for Fried Clay 200K' })).toBeTruthy()
})

test('retries a failed background initialization when opening registration', async () => {
	jest.useFakeTimers().setSystemTime(new Date('2026-11-07T12:00:00Z'))
	jest.spyOn(console, 'error').mockImplementation(() => {})
	const createWidget = jest.fn()
	window.EBWidgets = { createWidget }
	renderHost()
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(1))
	createWidget.mockImplementation(({ iframeContainerId }) => {
		document.getElementById(iframeContainerId).appendChild(document.createElement('iframe'))
	})
	fireEvent.click(screen.getByText('Open registration'))
	await waitFor(() => expect(createWidget).toHaveBeenCalledTimes(2))
	expect(screen.queryByRole('alert')).toBeNull()
	jest.useRealTimers()
})
