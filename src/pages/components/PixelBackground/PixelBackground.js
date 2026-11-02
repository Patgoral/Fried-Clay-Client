import { useEffect, useRef } from 'react'
import './PixelBackground.css'

const PIXEL = 6
const MAX_SPARKLES = 3
const CLOUD_DRIFT = 1.5

// Each layer is a depth: far clouds are small, dim and slow; near ones are big and faster.
const LAYERS = [
	{ count: 5, width: [14, 24], speed: 0.6, alpha: 0.22, colors: ['#4a3f66', '#5a4d7a', '#382f50'] },
	{ count: 4, width: [22, 38], speed: 1.1, alpha: 0.3, colors: ['#5d4d82', '#7260a0', '#463a66'] },
	{ count: 3, width: [34, 56], speed: 1.8, alpha: 0.38, colors: ['#6f5c9a', '#8a77b8', '#54467c'] },
]

const rand = (min, max) => min + Math.random() * (max - min)

// Builds a cloud sprite: overlapping puffs on a flat base, with light tops and dark undersides.
function makeCloud(widthCells, [base, light, dark]) {
	const height = Math.max(8, Math.round(widthCells * 0.45))
	const mask = Array.from({ length: height }, () => new Array(widthCells).fill(false))
	const baseline = height - 1
	const puffs = Math.max(3, Math.round(widthCells / 7))

	for (let i = 0; i < puffs; i++) {
		const t = puffs === 1 ? 0.5 : i / (puffs - 1)
		const edgeFalloff = 1 - Math.abs(t - 0.5) * 1.1
		const radius = Math.max(3, rand(0.18, 0.3) * widthCells * edgeFalloff)
		const cx = radius + t * (widthCells - radius * 2)
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < widthCells; x++) {
				const dx = x - cx
				const dy = y - (baseline - radius * 0.9)
				if (dx * dx + dy * dy <= radius * radius) mask[y][x] = true
			}
		}
	}

	const sprite = document.createElement('canvas')
	sprite.width = widthCells
	sprite.height = height
	const ctx = sprite.getContext('2d')
	const has = (x, y) => y >= 0 && y < height && x >= 0 && x < widthCells && mask[y][x]

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < widthCells; x++) {
			if (!mask[y][x]) continue
			let color = base
			if (!has(x, y - 2)) color = light
			else if (!has(x, y + 2) || y >= baseline - 1) color = dark
			ctx.fillStyle = color
			ctx.fillRect(x, y, 1, 1)
		}
	}
	return sprite
}

function PixelBackground() {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		const reducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches
		let clouds = []
		let stars = []
		let sparkles = []
		let cols = 0
		let rows = 0
		let timer
		let last = 0

		const build = () => {
			cols = Math.ceil(window.innerWidth / PIXEL)
			rows = Math.ceil(window.innerHeight / PIXEL)
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			// draw in art-pixel units on a full-resolution canvas so clouds can move 1 screen px at a time
			ctx.setTransform(PIXEL, 0, 0, PIXEL, 0, 0)
			ctx.imageSmoothingEnabled = false

			clouds = []
			LAYERS.forEach((layer) => {
				const count = Math.max(3, Math.round((layer.count * cols) / 120))
				const slot = cols / count
				for (let i = 0; i < count; i++) {
					const w = Math.round(rand(layer.width[0], layer.width[1]))
					const sprite = makeCloud(w, layer.colors)
					clouds.push({
						sprite,
						layer,
						x: i * slot + rand(0, slot * 0.6) - w / 2,
						y: Math.floor(rand(0, rows - sprite.height * 0.6)),
					})
				}
			})

			const starCount = Math.floor((cols * rows) / 900)
			stars = Array.from({ length: starCount }, () => ({
				x: Math.floor(Math.random() * cols),
				y: Math.floor(Math.random() * rows),
				phase: Math.random() * Math.PI * 2,
				rate: rand(0.0008, 0.002),
				rgb: Math.random() < 0.5 ? '255, 255, 255' : '255, 232, 140',
			}))
		}

		const drawSparkle = (s, size) => {
			const px = (dx, dy, a = 1) => {
				ctx.fillStyle = `rgba(${s.rgb}, ${a})`
				ctx.fillRect(s.x + dx, s.y + dy, 1, 1)
			}
			px(0, 0)
			if (size < 0.2) return
			;[[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => px(dx, dy))
			if (size < 0.5) return
			;[[2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([dx, dy]) => px(dx, dy))
			if (size < 0.75) return
			// full sparkle: long arms with a gap, plus faint corner dots
			;[3, 4].forEach((d) => {
				px(d, 0)
				px(-d, 0)
				px(0, d)
				px(0, -d)
			})
			;[[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(([dx, dy]) => px(dx, dy, 0.6))
			;[[2, 2], [-2, 2], [2, -2], [-2, -2]].forEach(([dx, dy]) => px(dx, dy, 0.35))
		}

		const draw = (now) => {
			ctx.clearRect(0, 0, cols, rows)

			for (const s of stars) {
				const a = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(now * s.rate + s.phase))
				ctx.fillStyle = `rgba(${s.rgb}, ${a})`
				ctx.fillRect(s.x, s.y, 1, 1)
			}

			if (!reducedMotion) {
				if (sparkles.length < MAX_SPARKLES && Math.random() < 0.007) {
					sparkles.push({
						x: Math.floor(rand(6, Math.max(7, cols - 6))),
						y: Math.floor(rand(6, Math.max(7, rows - 6))),
						start: now,
						duration: rand(1400, 2200),
						rgb: Math.random() < 0.7 ? '255, 232, 140' : '255, 255, 255',
					})
				}
				sparkles = sparkles.filter((s) => now - s.start < s.duration)
				for (const s of sparkles) {
					drawSparkle(s, Math.sin(((now - s.start) / s.duration) * Math.PI))
				}
			}

			for (const c of clouds) {
				ctx.globalAlpha = c.layer.alpha
				ctx.drawImage(c.sprite, c.x, c.y)
			}
			ctx.globalAlpha = 1
		}

		const step = (now) => {
			timer = requestAnimationFrame(step)
			const dt = Math.min((now - last) / 1000, 0.1)
			last = now
			for (const c of clouds) {
				c.x += c.layer.speed * dt * CLOUD_DRIFT
				if (c.x > cols) {
					c.x = -c.sprite.width
					c.y = Math.floor(rand(0, rows - c.sprite.height * 0.6))
				}
			}
			draw(now)
		}

		const onResize = () => {
			build()
			draw(performance.now())
		}

		build()
		draw(performance.now())
		window.addEventListener('resize', onResize)
		if (!reducedMotion) timer = requestAnimationFrame(step)

		return () => {
			window.removeEventListener('resize', onResize)
			cancelAnimationFrame(timer)
		}
	}, [])

	return <canvas ref={canvasRef} className="pixel-background" aria-hidden="true" />
}

export default PixelBackground
