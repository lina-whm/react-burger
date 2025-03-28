import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import type { RootState } from '../store/store'

interface OrderState {
	orderNumber: number | null
	loading: boolean
	error: string | null
}

const initialState: OrderState = {
	orderNumber: null,
	loading: false,
	error: null,
}

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds: string[], { rejectWithValue }) => {
		try {
			const response = await request<{
				success: boolean
				name: string
				order: { number: number }
			}>('/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('accessToken') || '',
				},
				body: JSON.stringify({ ingredients: ingredientIds }),
			})
			return response.order.number
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Unknown error'
			)
		}
	}
)

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: state => {
			state.orderNumber = null
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createOrder.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false
				state.orderNumber = action.payload
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export const { clearOrder } = orderSlice.actions
export default orderSlice.reducer
