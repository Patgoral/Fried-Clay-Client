import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const KEY = 'scroll:'

const TITLES = {
	'/': 'Fried Clay 200K',
	'/PastResults': 'Past Results | Fried Clay 200K',
	'/gallery': 'Gallery | Fried Clay 200K',
	'/register': 'Register | Fried Clay 200K',
	'/submit-time': 'Submit Your Time | Fried Clay 200K',
	'/access': 'Access | Fried Clay 200K',
	'/update': 'Manage | Fried Clay 200K',
}

export function usePageTitle(title) {
	useEffect(() => {
		if (title) document.title = title
	}, [title])
}

// Scrolls to top on new navigation; restores the saved position on Back/Forward.
export default function RouteEffects() {
	const { pathname } = useLocation()
	const navType = useNavigationType()

	useEffect(() => {
		if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
	}, [])

	useEffect(() => {
		const save = () => sessionStorage.setItem(KEY + pathname, String(window.scrollY))
		window.addEventListener('scroll', save, { passive: true })
		return () => window.removeEventListener('scroll', save)
	}, [pathname])

	useLayoutEffect(() => {
		const yearMatch = pathname.match(/^\/(20\d\d)$/)
		document.title = yearMatch
			? `${yearMatch[1]} Results | Fried Clay 200K`
			: TITLES[pathname] || 'Fried Clay 200K'

		if (navType !== 'POP') {
			window.scrollTo(0, 0)
			return
		}
		const saved = Number(sessionStorage.getItem(KEY + pathname)) || 0
		window.scrollTo(0, saved)
		// Lists load asynchronously, so retry until the page is tall enough.
		let tries = 0
		const timer = setInterval(() => {
			tries += 1
			if (saved === 0 || Math.abs(window.scrollY - saved) < 2 || tries > 20) {
				clearInterval(timer)
				return
			}
			window.scrollTo(0, saved)
		}, 150)
		return () => clearInterval(timer)
	}, [pathname, navType])

	return null
}
