import { request } from '../../components/utils/api'
import { Order } from '../types'

export const createOrder = (ingredientIds: string[]) => {
	return request<{
		success: boolean
		name: string
		order: { number: number }
	}>('/orders', {
		method: 'POST',
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
}

export const fetchOrder = (number: string) => {
	return request<{ orders: Order[] }>(`/orders/${number}`)
}
