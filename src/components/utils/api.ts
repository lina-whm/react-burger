const API_BASE = 'https://norma.nomoreparties.space/api'

function checkResponse(res: Response) {
	if (!res.ok) {
		return Promise.reject(`Ошибка ${res.status}`)
	}
	return res.json()
}

export function request<T>(url: string, options?: RequestInit): Promise<T> {
	return fetch(`${API_BASE}${url}`, options)
		.then(checkResponse)
		.catch(error => {
			console.error('API request failed:', error)
			throw error
		})
}
