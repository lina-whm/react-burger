import { API_BASE } from '@utils/api'


export const fetchIngredients = async () => {
	const response = await fetch(`${API_BASE}/ingredients`)
	const data = await response.json()
	return data.data
}

export {} 
