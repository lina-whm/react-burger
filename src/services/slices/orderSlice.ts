import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import { Order } from '../types'

interface OrderState {
	orderNumber: number | null
	loading: boolean
	error: string | null
	createdOrder: Order | null
}

const initialState: OrderState = {
	orderNumber: null,
	loading: false,
	error: null,
	createdOrder: null,
}

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredients: string[], { rejectWithValue }) => {
		try {
			const response = await request<{
				success: boolean
				name: string
				order: { number: number }
			}>('/orders', {
				method: 'POST',
				body: JSON.stringify({ ingredients }),
			})
			const orderNumber = response.order.number
			
			// Создаём объект заказа для ленты
			const order: Order = {
				_id: `order-${Date.now()}`,
				ingredients: ingredients,
				status: 'done',
				name: response.name,
				number: orderNumber,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			}
			
			return order
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to create order')
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
				state.orderNumber = action.payload.number
				state.createdOrder = action.payload
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false
				state.error = (action.payload as string) || 'Failed to create order'
			})
	},
})

export const { clearOrder } = orderSlice.actions
export default orderSlice.reducer
