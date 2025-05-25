export const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)

	const time = date
		.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short',
		})
		.replace(/(:\d{2}| [AP]M)$/, '')

	if (date.toDateString() === today.toDateString()) {
		return `Сегодня, ${time}`
	} else if (date.toDateString() === yesterday.toDateString()) {
		return `Вчера, ${time}`
	} else {
		return `${date.toLocaleDateString()}, ${time}`
	}
}
