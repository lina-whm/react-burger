import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { ConstructorIngredient } from '../../components/utils/types'

export interface ConstructorState {
	bun: ConstructorIngredient | null
	ingredients: ConstructorIngredient[]
}

export const initialState: ConstructorState = {
	bun: null,
	ingredients: [],
}

const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addIngredient: {
			reducer(state, action: PayloadAction<ConstructorIngredient>) {
				if (action.payload.type === 'bun') {
					state.bun = action.payload
				} else {
					state.ingredients.push(action.payload)
				}
			},
			prepare(ingredient: Omit<ConstructorIngredient, 'uuid'>) {
				return {
					payload: {
						...ingredient,
						uuid: uuidv4(),
					},
				}
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				item => item.uuid !== action.payload
			)
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const newIngredients = [...state.ingredients]
			const [removed] = newIngredients.splice(action.payload.dragIndex, 1)
			newIngredients.splice(action.payload.hoverIndex, 0, removed)
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
