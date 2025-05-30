import ingredientDetailsSlice, {
	setIngredientDetails,
	clearIngredientDetails,
} from './ingredientDetailsSlice'
import { Ingredient } from '../../components/utils/types'

const initialState = ingredientDetailsSlice(undefined, { type: '' })

const mockIngredient: Ingredient = {
	_id: '1',
	name: 'Булка',
	type: 'bun',
	price: 100,
	image: 'image',
	calories: 300,
	proteins: 10,
	fat: 5,
	carbohydrates: 50,
}

describe('ingredientDetailsSlice', () => {
	it('should return initial state', () => {
		expect(ingredientDetailsSlice(undefined, { type: '' })).toEqual(
			initialState
		)
	})

	it('should set ingredient details', () => {
		const state = ingredientDetailsSlice(
			initialState,
			setIngredientDetails(mockIngredient)
		)
		expect(state.ingredient).toEqual(mockIngredient)
	})

	it('should clear ingredient details', () => {
		const stateWithIngredient = { ...initialState, ingredient: mockIngredient }
		const state = ingredientDetailsSlice(
			stateWithIngredient,
			clearIngredientDetails()
		)
		expect(state.ingredient).toBeNull()
	})
})
