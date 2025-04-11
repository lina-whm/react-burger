import { request } from '../../components/utils/api'
import { getCookie } from '../../services/utils/cookies'

export interface OrderResponse {
	success: boolean
	name: string
	order: {
		number: number
	}
}

export const createOrder = (ingredientIds: string[]) => {
	const accessToken = getCookie('accessToken')
	return request<OrderResponse>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
}
