import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Ingredient, ConstructorIngredient } from '../../components/utils/types'

interface ConstructorState {
	bun: ConstructorIngredient | null
	ingredients: ConstructorIngredient[]
}

const initialState: ConstructorState = {
	bun: null,
	ingredients: [],
}

export const constructorSlice = createSlice({
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
			prepare(ingredient: Ingredient) {
				return {
					payload: {
						...ingredient,
						uniqueId: uuidv4(),
					} as ConstructorIngredient,
				}
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				item => item.uniqueId !== action.payload
			)
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const { dragIndex, hoverIndex } = action.payload
			// Добавляем проверку на валидность индексов
			if (
				dragIndex < 0 ||
				dragIndex >= state.ingredients.length ||
				hoverIndex < 0 ||
				hoverIndex >= state.ingredients.length
			) {
				return
			}

			const newIngredients = [...state.ingredients]
			const [removed] = newIngredients.splice(dragIndex, 1)
			// Добавляем проверку на существование элемента
			if (!removed) return

			newIngredients.splice(hoverIndex, 0, removed)
			state.ingredients = newIngredients
		},
		clearConstructor: () => initialState,
	},
})

export const {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} = constructorSlice.actions

export default constructorSlice.reducer
