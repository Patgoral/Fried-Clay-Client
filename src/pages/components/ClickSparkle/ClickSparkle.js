import { useEffect, useRef } from 'react'

const PIXEL = 4
const DURATION = 550
const COLORS = ['255, 232, 140', '255, 255, 255', '201, 180, 226']

function ClickSparkle() {
	const canvasRef = useRef(null)

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		let sparkles = []
		let frame = null

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		const block = (x, y, rgb, alpha) => {
			ctx.fillStyle = `rgba(${rgb}, ${alpha})`
			ctx.fillRect(Math.round(x / PIXEL) * PIXEL, Math.round(y / PIXEL) * PIXEL, PIXEL, PIXEL)
		}

		const render = (now) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			sparkles = sparkles.filter((s) => now - s.start < DURATION)

			for (const s of sparkles) {
				const t = (now - s.start) / DURATION
				const alpha = 1 - t
				const reach = Math.min(4, Math.floor(t * 8) + 1)
				block(s.x, s.y, s.rgb, alpha)
				for (let d = 1; d <= reach; d++) {
					const off = d * PIXEL
					block(s.x + off, s.y, s.rgb, alpha)
					block(s.x - off, s.y, s.rgb, alpha)
					block(s.x, s.y + off, s.rgb, alpha)
					block(s.x, s.y - off, s.rgb, alpha)
				}
				// diagonal bits drift outward
				const drift = (1 + Math.floor(t * 4)) * PIXEL
				;[[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(([dx, dy]) =>
					block(s.x + dx * drift, s.y + dy * drift, s.rgb, alpha * 0.7)
				)
			}

			frame = sparkles.length ? requestAnimationFrame(render) : null
		}

		const onPointerDown = (event) => {
			if (event.pointerType === 'touch' && event.isPrimary === false) return
			sparkles.push({
				x: event.clientX,
				y: event.clientY,
				start: performance.now(),
				rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
			})
			if (!frame) frame = requestAnimationFrame(render)
		}

		resize()
		window.addEventListener('resize', resize)
		window.addEventListener('pointerdown', onPointerDown)

		return () => {
			window.removeEventListener('resize', resize)
			window.removeEventListener('pointerdown', onPointerDown)
			if (frame) cancelAnimationFrame(frame)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			style={{
				position: 'fixed',
				inset: 0,
				width: '100vw',
				height: '100vh',
				zIndex: 9999,
				pointerEvents: 'none',
			}}
		/>
	)
}

export default ClickSparkle
