import { createSlice } from '@reduxjs/toolkit'
import { Ingredient } from '@utils/types' 

interface IngredientDetailsState {
	ingredient: Ingredient | null
}

const initialState: IngredientDetailsState = {
	ingredient: null,
}

const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.ingredient = action.payload
		},
		clearIngredientDetails: state => {
			state.ingredient = null
		},
	},
})

export const { setIngredientDetails, clearIngredientDetails } =
	ingredientDetailsSlice.actions

export default ingredientDetailsSlice.reducer 
