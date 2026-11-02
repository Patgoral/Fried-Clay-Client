import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './PixelBackground.css'

const CELL = 6
const COLORS = ['128, 98, 163', '146, 117, 181', '90, 120, 170', '170, 90, 120']

function PixelBackground() {
	const canvasRef = useRef(null)
	const burstRef = useRef(() => {})
	const { pathname } = useLocation()
	const pathRef = useRef(pathname)

	useEffect(() => {
		pathRef.current = pathname
		burstRef.current()
	}, [pathname])
	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches
		let particles = []
		let frame
		let width = 0
		let height = 0

		const spawn = (randomLife) => ({
			x: Math.floor(Math.random() * (width / CELL)) * CELL,
			y: Math.floor(Math.random() * (height / CELL)) * CELL,
			color: COLORS[Math.floor(Math.random() * COLORS.length)],
			life: randomLife ? Math.random() : 0,
			speed: 0.004 + Math.random() * 0.01,
			drift: Math.random() < 0.3,
			dx: (Math.random() < 0.5 ? -1 : 1) * CELL,
			step: 0,
		})

		const draw = () => {
			ctx.clearRect(0, 0, width, height)
			for (const p of particles) {
				const alpha = Math.sin(Math.min(p.life, 1) * Math.PI) * 0.55
				ctx.fillStyle = `rgba(${p.color}, ${alpha})`
				ctx.fillRect(p.x, p.y, CELL - 1, CELL - 1)
			}
		}

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2)
			width = window.innerWidth
			height = window.innerHeight
			canvas.width = width * dpr
			canvas.height = height * dpr
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			const count = Math.min(220, Math.floor((width * height) / 9000))
			particles = Array.from({ length: count }, () => spawn(true))
			if (reducedMotion) draw()
		}

		const tick = () => {
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i]
				p.life += p.speed
				p.step += 1
				if (p.drift && p.step % 45 === 0) {
					p.x += p.dx
					p.y -= CELL
				}
				if (p.life >= 1) particles[i] = spawn(false)
			}
			draw()
			frame = requestAnimationFrame(tick)
		}

		resize()
		burstRef.current = () => {
			if (reducedMotion || pathRef.current === '/update') return
			const burst = Math.min(90, Math.floor((width * height) / 20000))
			for (let i = 0; i < burst; i++) {
				const p = spawn(false)
				p.speed = 0.02 + Math.random() * 0.02
				p.drift = true
				particles.push(p)
			}
		}
		window.addEventListener('resize', resize)
		if (!reducedMotion) frame = requestAnimationFrame(tick)

		return () => {
			window.removeEventListener('resize', resize)
			cancelAnimationFrame(frame)
		}
	}, [])

	return <canvas ref={canvasRef} className="pixel-background" aria-hidden="true" />
}

export default PixelBackground
