const SCRIPT_URL = 'https://www.eventbrite.com/static/widgets/eb_widgets.js'
let pendingLoad

export function loadEventbriteWidget() {
	if (window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
		return Promise.resolve(window.EBWidgets)
	}
	if (pendingLoad) return pendingLoad

	pendingLoad = new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = SCRIPT_URL
		script.async = true
		script.onload = () => {
			pendingLoad = null
			if (window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
				resolve(window.EBWidgets)
			} else {
				script.remove()
				reject(new Error('Eventbrite checkout is unavailable'))
			}
		}
		script.onerror = () => {
			pendingLoad = null
			script.remove()
			reject(new Error('Unable to load the Eventbrite checkout script'))
		}
		document.body.appendChild(script)
	})
	return pendingLoad
}
