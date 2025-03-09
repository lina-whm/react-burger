import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '@utils/api'
import { Ingredient } from '@utils/types'

interface IngredientsState {
	items: Ingredient[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: IngredientsState = {
	items: [],
	status: 'idle',
	error: null,
}

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await fetch(`${API_BASE}/ingredients`)
		const data = await response.json()
		return data.data
	}
)

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchIngredients.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message || 'Ошибка загрузки ингредиентов'
			})
	},
})

export default ingredientsSlice.reducer
