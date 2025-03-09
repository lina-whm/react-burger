import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from '../slices/ingredientsSlice'
import constructorReducer from '../slices/constructorSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		constructor: constructorReducer,
		order: orderReducer,
		ingredientDetails: ingredientDetailsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
