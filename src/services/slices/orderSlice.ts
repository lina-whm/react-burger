import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'

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
	async (ingredients: string[]) => {
		const response = await request<{ order: { number: number } }>('/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ingredients }),
		})
		return response.order.number
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
				state.error = action.error.message || 'Ошибка оформления заказа'
			})
	},
})

export const { clearOrder } = orderSlice.actions
export default orderSlice.reducer
