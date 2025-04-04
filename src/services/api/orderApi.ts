import { request } from '../../components/utils/api'

export interface OrderResponse {
	success: boolean
	name: string
	order: {
		number: number
	}
}

export const createOrder = (ingredientIds: string[]) => {
	return request<OrderResponse>('/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json', 
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
}
