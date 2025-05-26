import { configureStore } from '@reduxjs/toolkit'
import { createRefreshTokenMiddleware } from './refreshTokenMiddleware'
import { socketMiddleware } from '../middleware/wsMiddleware'
import authReducer from '../slices/authSlice'
import constructorReducer from '../slices/constructorSlice'
import ingredientsReducer from '../slices/ingredientsSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'
import ordersFeedReducer from '../slices/ordersFeedSlice'

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
					'ordersFeed/wsConnectionError',
					'ordersFeed/wsConnectionStart',
					'ordersFeed/wsGetOrders',
				],
				ignoredPaths: [
					'burgerConstructor.ingredients.*.uniqueId',
					'ingredients.items',
				],
			},
		}).concat(socketMiddleware(), createRefreshTokenMiddleware()),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
