import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from '@utils/types'

interface ConstructorState {
	bun: Ingredient | null
	ingredients: Ingredient[]
}

const initialState: ConstructorState = {
	bun: null,
	ingredients: [],
}

const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
	
		addIngredient: (state, action: PayloadAction<Ingredient>) => {
			if (action.payload.type === 'bun') {
				state.bun = action.payload
			} else {
				state.ingredients.push(action.payload)
			}
		},
	
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				ingredient => ingredient._id !== action.payload
			)
		},
		
		moveIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const { dragIndex, hoverIndex } = action.payload
			const draggedItem = state.ingredients[dragIndex]
			const newIngredients = [...state.ingredients]
			newIngredients.splice(dragIndex, 1)
			newIngredients.splice(hoverIndex, 0, draggedItem)
			state.ingredients = newIngredients
		},
		
		clearConstructor: state => {
			state.bun = null
			state.ingredients = []
		},
	},
})

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} = constructorSlice.actions

export default constructorSlice.reducer
