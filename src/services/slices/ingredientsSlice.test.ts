import ingredientsReducer, { fetchIngredients } from './ingredientsSlice'
import { Ingredient } from '../../components/utils/types'

const initialState = {
	items: [] as Ingredient[],
	loading: false,
	error: null as string | null,
}

const mockIngredients: Ingredient[] = [
	{
		_id: '1',
		name: 'Булка',
		type: 'bun',
		price: 100,
		image: 'image',
		calories: 300,
		proteins: 10,
		fat: 5,
		carbohydrates: 50,
	},
]

describe('ingredientsSlice', () => {
	it('should return initial state', () => {
		expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState)
	})

	it('should handle fetchIngredients.pending', () => {
		const action = { type: fetchIngredients.pending.type }
		const state = ingredientsReducer(initialState, action)
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		})
	})

	it('should handle fetchIngredients.fulfilled', () => {
		const action = {
			type: fetchIngredients.fulfilled.type,
			payload: mockIngredients,
		}
		const state = ingredientsReducer(initialState, action)
		expect(state).toEqual({
			...initialState,
			items: mockIngredients,
			loading: false,
		})
	})

	it('should handle fetchIngredients.rejected', () => {
		const errorMessage = 'Ошибка загрузки ингредиентов'
		const action = {
			type: fetchIngredients.rejected.type,
			payload: errorMessage,
		}
		const state = ingredientsReducer(initialState, action)
		expect(state).toEqual({
			...initialState,
			error: errorMessage,
			loading: false,
		})
	})
})
