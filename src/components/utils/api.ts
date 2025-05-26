import { getCookie } from '../../services/utils/cookies'
const API_BASE = 'https://norma.nomoreparties.space/api'

export function checkResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		return res.json().then(err => Promise.reject(err))
	}
	return res.json()
}

export async function request<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	try {
		let token = getCookie('accessToken')
		let shouldRetry = true

		const makeRequest = async (): Promise<T> => {
			const headers = {
				'Content-Type': 'application/json',
				...(token && { Authorization: `Bearer ${token}` }),
				...options?.headers,
			}

			const response = await fetch(`${API_BASE}${url}`, {
				...options,
				headers,
			})

			if (response.status === 403 && shouldRetry) {
				shouldRetry = false
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) throw new Error('No refresh token')

				const tokenResponse = await fetch(`${API_BASE}/auth/token`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ token: refreshToken }),
				})

				if (!tokenResponse.ok) throw new Error('Failed to refresh token')

				const { accessToken, refreshToken: newRefreshToken } =
					await tokenResponse.json()
				token = accessToken.split('Bearer ')[1]
				document.cookie = `accessToken=${token}; path=/; max-age=${20 * 60}`
				localStorage.setItem('refreshToken', newRefreshToken)

				return makeRequest()
			}

			return await checkResponse<T>(response)
		}

		return await makeRequest()
	} catch (error) {
		console.error('API request failed:', error)
		throw error
	}
}
