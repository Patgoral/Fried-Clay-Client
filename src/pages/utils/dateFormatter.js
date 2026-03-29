export const dateFormatter = (date) => {
	const d = new Date(date)
	const month = d.getMonth() + 1
	const day = d.getDate()
	const year = d.getFullYear()
	const hours = d.getHours()
	const minutes = d.getMinutes()
	const seconds = d.getSeconds()

	const meridian = hours < 12 ? 'AM' : 'PM'
	const hoursFormatted = hours % 12 === 0 ? 12 : hours % 12

	return `${month}/${day}/${year} ${hoursFormatted}:${minutes
		.toString()
		.padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${meridian}`
}
export const elapsedTime = (dateInput) => {
	const date = new Date(dateInput)
	const year = date.getFullYear()

	let targetDate
	if (year === 2027) {
		targetDate = new Date(2027, 2, 20, 8, 0, 0)
	} else if (year === 2026) {
		targetDate = new Date(2026, 2, 21, 8, 0, 0)
	} else if (year === 2025) {
		targetDate = new Date(2025, 2, 22, 8, 0, 0)
	} else if (year === 2024) {
		targetDate = new Date(2024, 2, 23, 8, 0, 0)
	} else if (year === 2023) {
		targetDate = new Date(2023, 2, 25, 8, 0, 0)
	} else {
		return 'TIME ERROR'
	}

	// If finish time is before the race start
	if (date < targetDate) {
		return 'TIME ERROR'
	}

	const elapsedMilliseconds = date - targetDate
	const totalSeconds = Math.floor(elapsedMilliseconds / 1000)

	const elapsedHours = Math.floor(totalSeconds / 3600)
	const elapsedMinutes = Math.floor((totalSeconds % 3600) / 60)
	const elapsedSeconds = totalSeconds % 60

	return `${elapsedHours} hours, ${elapsedMinutes} minutes, ${elapsedSeconds} seconds`
}