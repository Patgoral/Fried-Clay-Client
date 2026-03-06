export const dateFormatter = (date) => {
	const d = new Date(date)
	const month = d.getMonth() + 1
	const day = d.getDate()
	const year = d.getFullYear()
	const hours = d.getHours()
	const minutes = d.getMinutes()
	const meridian = hours < 12 ? 'AM' : 'PM'
	const hoursFormatted = hours % 12 === 0 ? 12 : hours % 12

	return `${month}/${day}/${year} ${hoursFormatted}:${minutes
		.toString()
		.padStart(2, '0')} ${meridian}`
}

export const elapsedTime = (dateInput) => {
	const date = new Date(dateInput)
	const year = date.getFullYear()

	let targetDate

	if (year === 2026) {
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

	const elapsedMilliseconds = Math.abs(date - targetDate)
	const elapsedMinutes = Math.floor(elapsedMilliseconds / 1000 / 60)
	const elapsedHours = Math.floor(elapsedMinutes / 60)
	const remainingMinutes = elapsedMinutes % 60

	return `${elapsedHours} hours, ${remainingMinutes} minutes`
}