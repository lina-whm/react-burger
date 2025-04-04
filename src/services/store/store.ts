import { configureStore } from '@reduxjs/toolkit'
import constructorReducer from '../slices/constructorSlice'
import ingredientsReducer from '../slices/ingredientsSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'

export const store = configureStore({
	reducer: {
		burgerConstructor: constructorReducer,
		ingredients: ingredientsReducer,
		order: orderReducer,
		ingredientDetails: ingredientDetailsReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'burgerConstructor/addIngredient',
					'ingredients/fetchIngredients/fulfilled',
				],
				ignoredPaths: [
					'burgerConstructor.ingredients.*.uniqueId',
					'ingredients.items',
				],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
