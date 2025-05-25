import { configureStore } from '@reduxjs/toolkit'
import constructorReducer from '../slices/constructorSlice'
import ingredientsReducer from '../slices/ingredientsSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'
import authReducer from '../slices/authSlice'
import ordersFeedReducer from '../slices/ordersFeedSlice'
import { createRefreshTokenMiddleware } from './refreshTokenMiddleware'
import { wsMiddleware } from '../middleware/wsMiddleware'

const store = configureStore({
	reducer: {
		auth: authReducer,
		burgerConstructor: constructorReducer,
		ingredients: ingredientsReducer,
		order: orderReducer,
		ingredientDetails: ingredientDetailsReducer,
		ordersFeed: ordersFeedReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'burgerConstructor/addIngredient',
					'ingredients/fetchIngredients/fulfilled',
					'WS_CONNECTION_ERROR',
					'WS_GET_MESSAGE',
				],
				ignoredPaths: [
					'burgerConstructor.ingredients.*.uniqueId',
					'ingredients.items',
				],
			},
		}).concat(wsMiddleware, createRefreshTokenMiddleware()),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
