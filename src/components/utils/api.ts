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
		const refreshToken = localStorage.getItem('refreshToken')

		if (
			!token &&
			!['/auth/login', '/auth/register'].includes(url) &&
			refreshToken
		) {
			try {
				const refreshResponse = await fetch(`${API_BASE}/auth/token`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token: refreshToken }),
				})

				if (refreshResponse.ok) {
					const { accessToken, refreshToken: newRefreshToken } =
						await refreshResponse.json()
					token = accessToken.split('Bearer ')[1]
					document.cookie = `accessToken=${token}; path=/; max-age=${20 * 60}`
					localStorage.setItem('refreshToken', newRefreshToken)
				}
			} catch (refreshError) {
				console.error('Failed to refresh token:', refreshError)
				throw new Error('Authentication required')
			}
		}

		const headers = {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
			'X-Cohort': 'react-cohort-48',
			'X-Token': '92f036d5-911a-4ec7-90a7-cfc63f7c4409',
			...options?.headers,
		}

		const response = await fetch(`${API_BASE}${url}`, {
			...options,
			headers,
		})

		if (response.status === 403 && refreshToken) {
			const refreshResponse = await fetch(`${API_BASE}/auth/token`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: refreshToken }),
			})

			if (!refreshResponse.ok) {
				throw new Error('Failed to refresh token')
			}

			const { accessToken, refreshToken: newRefreshToken } =
				await refreshResponse.json()
			const newToken = accessToken.split('Bearer ')[1]
			document.cookie = `accessToken=${newToken}; path=/; max-age=${20 * 60}`
			localStorage.setItem('refreshToken', newRefreshToken)

			headers.Authorization = `Bearer ${newToken}`
			const newResponse = await fetch(`${API_BASE}${url}`, {
				...options,
				headers,
			})
			return await checkResponse<T>(newResponse)
		}

		return await checkResponse<T>(response)
	} catch (error) {
		console.error('API request failed:', error)
		throw error
	}
}