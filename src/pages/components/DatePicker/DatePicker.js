import React, { useRef, useState } from 'react'

const DatePicker = () => {
	const [date, setDate] = useState(new Date('03/23/2024 7:00 AM EST'));
	const dateInputRef = useRef(null)

	const handleChange = (e) => {
		setDate(e.target.value)
	}

	return (
		<div>
			<input type="date" onChange={handleChange} ref={dateInputRef} />
		</div>
	)
}

export default DatePicker
