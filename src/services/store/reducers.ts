import { combineReducers } from 'redux'
import ingredientsReducer from '../slices/ingredientsSlice'
import constructorReducer from '../slices/constructorSlice'
import orderReducer from '../slices/orderSlice'
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice'

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructor: constructorReducer,
	order: orderReducer,
	ingredientDetails: ingredientDetailsReducer,
})

export default rootReducer
