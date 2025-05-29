import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import { Order } from '../types'

interface OrdersFeedState {
	orders: Order[]
	total: number
	totalToday: number
	wsConnected: boolean
	connecting: boolean
	error?: string
	loading: boolean
}

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	wsConnected: false,
	connecting: false,
	error: undefined,
	loading: false,
}

export const fetchOrder = createAsyncThunk(
	'ordersFeed/fetchOrder',
	async (number: string, { rejectWithValue }) => {
		try {
			const response = await request<{ orders: Order[] }>(`/orders/${number}`)
			if (!response.orders || response.orders.length === 0) {
				return rejectWithValue('Order not found')
			}
			return response.orders[0]
		} catch (error: any) {
			return rejectWithValue(error.message || 'Failed to fetch order')
		}
	}
)

export const ordersFeedSlice = createSlice({
	name: 'ordersFeed',
	initialState,
	reducers: {
		wsConnectionStart: (
			state,
			action: PayloadAction<{ url: string; withToken: boolean }>
		) => {
			state.wsConnected = false
			state.connecting = true
			state.error = undefined
		},
		wsConnectionSuccess: state => {
			state.wsConnected = true
			state.connecting = false
			state.error = undefined
		},
		wsConnectionError: (state, action: PayloadAction<string>) => {
			state.wsConnected = false
			state.connecting = false
			state.error = action.payload
		},
		wsConnectionClosed: state => {
			state.wsConnected = false
			state.connecting = false
			state.error = undefined
		},
		wsGetOrders: (
			state,
			action: PayloadAction<{
				success: boolean
				orders: Order[]
				total: number
				totalToday: number
				message?: string
			}>
		) => {
			if (!action.payload.success) {
				state.error = action.payload.message || 'Ошибка получения заказов'
				return
			}

			if (action.payload.message === 'Invalid or missing token') {
				state.error = 'Недействительный токен'
				return
			}

			const validOrders = action.payload.orders.filter(
				order => order._id && order.number && order.ingredients
			)

			state.orders = validOrders
			state.total = action.payload.total
			state.totalToday = action.payload.totalToday
			state.error = undefined
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchOrder.pending, state => {
				state.loading = true
				state.error = undefined
			})
			.addCase(fetchOrder.fulfilled, (state, action) => {
				if (action.payload) {
					const existingIndex = state.orders.findIndex(
						o => o._id === action.payload._id
					)
					if (existingIndex === -1) {
						state.orders.push(action.payload)
					} else {
						state.orders[existingIndex] = action.payload
					}
				}
				state.loading = false
			})
			.addCase(fetchOrder.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
				console.error('Failed to fetch order:', action.payload)
			})
	},
})

export const {
	wsConnectionStart,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
} = ordersFeedSlice.actions

export const selectOrdersFeed = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed
export const selectOrderByNumber = (
	state: { ordersFeed: OrdersFeedState },
	number: number
) => {
	return state.ordersFeed.orders.find(order => order.number === number)
}
export const selectOrders = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.orders
export const selectTotal = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.total
export const selectTotalToday = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.totalToday
export const selectWsConnected = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.wsConnected
export const selectWsConnecting = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.connecting
export const selectWsError = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.error
export const selectOrderById = (
	state: { ordersFeed: OrdersFeedState },
	number: number
) => state.ordersFeed.orders.find(order => order.number === number)
export const selectOrdersLoading = (state: { ordersFeed: OrdersFeedState }) =>
	state.ordersFeed.loading

export default ordersFeedSlice.reducer
