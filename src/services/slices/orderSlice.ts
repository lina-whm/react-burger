import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_BASE } from '@utils/api'

interface OrderState {
	orderNumber: number | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
}

const initialState: OrderState = {
	orderNumber: null,
	status: 'idle',
	error: null,
}

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (ingredientIds: string[], { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_BASE}/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients: ingredientIds }),
			})
			const data = await response.json()
			if (!data.success)
				throw new Error(data.message || 'Ошибка при создании заказа')
			return data.order.number
		} catch (error) {
		
			const errorMessage =
				error instanceof Error ? error.message : 'Неизвестная ошибка'
			return rejectWithValue(errorMessage)
		}
	}
)

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		clearOrder: state => {
			state.orderNumber = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createOrder.pending, state => {
				state.status = 'loading'
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orderNumber = action.payload
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload as string
			})
	},
})

export const { clearOrder } = orderSlice.actions

export default orderSlice.reducer
