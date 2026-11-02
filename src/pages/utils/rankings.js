const getTimeMs = (a) => {
	const time = a.finishTime ?? a.date ?? null
	if (!time || !a.createdAt) return null
	const event = new Date(time)
	const created = new Date(a.createdAt)
	if (Number.isNaN(event.getTime()) || Number.isNaN(created.getTime())) return null
	if (event.getFullYear() !== created.getFullYear()) return null
	return event.getTime()
}

// Mirrors the ranking on the results list pages so direct links show the same places.
export function computeRanks(attendees, targetId, year) {
	const sorted = attendees
		.map((a) => ({ a, ms: getTimeMs(a) }))
		.filter((x) => x.ms !== null)
		.sort((x, y) => x.ms - y.ms)

	const place = (state, ms) => {
		state.count += 1
		if (state.lastMs !== ms) {
			state.lastMs = ms
			state.lastPos = state.count
		}
		return state.lastPos
	}
	const overall = { count: 0, lastMs: null, lastPos: null }
	const byGender = {}
	const byGear = {}
	const useGear = year >= 2026

	for (const { a, ms } of sorted) {
		const pos = place(overall, ms)
		const gState = (byGender[a.gender] ||= { count: 0, lastMs: null, lastPos: null })
		const gPos = place(gState, ms)
		let gearPos = null
		if (useGear && (a.geared === 'SS' || a.geared === 'Fixed')) {
			const sState = (byGear[a.geared] ||= { count: 0, lastMs: null, lastPos: null })
			gearPos = place(sState, ms)
		}
		if (a._id === targetId) {
			return {
				position: pos,
				genderPosition: a.gender ? `${a.gender} ${gPos}` : null,
				gearedPosition: gearPos ? `${a.geared} ${gearPos}` : null,
			}
		}
	}
	return {}
}
