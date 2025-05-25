import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, OrdersResponse } from '../types'

interface OrdersFeedState {
	orders: Order[]
	total: number
	totalToday: number
	wsConnected: boolean
	error?: string
	isLoading: boolean
}

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	wsConnected: false,
	isLoading: true,
}

export const ordersFeedSlice = createSlice({
	name: 'ordersFeed',
	initialState,
	reducers: {
		wsConnect(
			state,
			action: PayloadAction<{ url: string; withToken: boolean }>
		) {
			state.isLoading = true
			state.error = undefined
		},
		wsDisconnect(state) {
			state.wsConnected = false
			state.isLoading = false
		},
		wsConnectionSuccess(state) {
			state.wsConnected = true
			state.error = undefined
			state.isLoading = false
		},
		wsConnectionError(state, action: PayloadAction<string>) {
			state.wsConnected = false
			state.error = action.payload
			state.isLoading = false
		},
		wsConnectionClosed(state) {
			state.wsConnected = false
			state.isLoading = false
		},
		wsGetMessage(state, action: PayloadAction<OrdersResponse>) {
			state.orders = action.payload.orders
			state.total = action.payload.total
			state.totalToday = action.payload.totalToday
			state.isLoading = false
		},
		wsGetMessageError(state, action: PayloadAction<string>) {
			state.error = action.payload
			state.isLoading = false
		},
	},
})

export const {
	wsConnect,
	wsDisconnect,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetMessage,
	wsGetMessageError,
} = ordersFeedSlice.actions

export default ordersFeedSlice.reducer
