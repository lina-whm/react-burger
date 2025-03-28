import { request } from '../../components/utils/api'
import { Ingredient } from '../../components/utils/types'

export const fetchIngredients = () => {
	return request<{ data: Ingredient[] }>('/ingredients')
}