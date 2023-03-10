import './EventPage.css'

export default function EventPage() {
	return (
		<div className="event-page">
			<div className="event-page-container-top">
				EVENT Container
				<div className="description-container">
					DESC COntainer
					<div className="button-div">
						<button>Click</button>
					</div>
				</div>
			</div>
			<div className="event-page-list-container">
				<div className="attendees-container">
					<div className="attendees-header">Leaderboard</div>
					<div className="list-container-overflow">name</div>
				</div>
			</div>
		</div>
	)
}
