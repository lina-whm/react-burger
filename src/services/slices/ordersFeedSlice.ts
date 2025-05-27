import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order, OrdersResponse } from '../types'

interface OrdersFeedState {
	orders: Order[]
	total: number
	totalToday: number
	wsConnected: boolean
	error?: string 
}

const initialState: OrdersFeedState = {
	orders: [],
	total: 0,
	totalToday: 0,
	wsConnected: false,
}

export const ordersFeedSlice = createSlice({
	name: 'ordersFeed',
	initialState,
	reducers: {
		wsConnectionStart: (
			state,
			action: PayloadAction<{ url: string; withToken: boolean }>
		) => {
			state.wsConnected = false
			state.error = undefined
		},
		wsConnectionSuccess: state => {
			state.wsConnected = true
			state.error = undefined
		},
		wsConnectionError: (state, action: PayloadAction<string>) => {
			// Теперь принимаем строку
			state.wsConnected = false
			state.error = action.payload
		},
		wsConnectionClosed: state => {
			state.wsConnected = false
			state.error = undefined
		},
		wsGetOrders: (state, action: PayloadAction<OrdersResponse>) => {
			state.orders = action.payload.orders
			state.total = action.payload.total
			state.totalToday = action.payload.totalToday
		},
		wsSendMessage: (state, action: PayloadAction<any>) => {},
	},
})

export const {
	wsConnectionStart,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
	wsSendMessage,
} = ordersFeedSlice.actions

export default ordersFeedSlice.reducer
