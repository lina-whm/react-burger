import { configureStore } from '@reduxjs/toolkit'
import constructorReducer from '../slices/constructorSlice'
import ingredientsReducer from '../slices/ingredientsSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'
import authReducer from '../slices/authSlice'
import { refreshTokenMiddleware } from './refreshTokenMiddleware'

export const store = configureStore({
	reducer: {
		auth: authReducer,
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
		}).concat(refreshTokenMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
