import { API_BASE } from '@utils/api'


export const createOrder = async (ingredientIds: string[]) => {
	const response = await fetch(`${API_BASE}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ingredients: ingredientIds }),
	})
	const data = await response.json()
	return data.order.number
}

export {} 
