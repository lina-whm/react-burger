import { configureStore } from '@reduxjs/toolkit'
import constructorReducer from '../slices/constructorSlice'
import ingredientsReducer from '../slices/ingredientsSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'

export const store = configureStore({
	reducer: {
		constructor: constructorReducer,
		ingredients: ingredientsReducer,
		order: orderReducer,
		ingredientDetails: ingredientDetailsReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
