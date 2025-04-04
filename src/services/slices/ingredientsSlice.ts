import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import { Ingredient } from '../../components/utils/types'

interface IngredientsState {
	items: Ingredient[]
	loading: boolean
	error: string | null
}

const initialState: IngredientsState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await request<{ data: Ingredient[] }>('/ingredients')
		return response.data
	}
)

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchIngredients.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка загрузки'
			})
	},
})

export default ingredientsSlice.reducer
