import orderReducer, { createOrder, clearOrder } from './orderSlice'
import { Order } from '../types'

const initialState = orderReducer(undefined, { type: '' })

describe('orderSlice', () => {
	it('should return initial state', () => {
		expect(orderReducer(undefined, { type: '' })).toEqual(initialState)
	})

	it('should handle createOrder.pending', () => {
		const state = orderReducer(initialState, createOrder.pending('', []))
		expect(state).toEqual({
			...initialState,
			loading: true,
			error: null,
		})
	})

	it('should handle createOrder.fulfilled', () => {
		const order: Order = {
			_id: 'order-1',
			ingredients: ['ing1', 'ing2'],
			status: 'done',
			name: 'Test Burger',
			number: 12345,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}
		const state = orderReducer(
			initialState,
			createOrder.fulfilled(order, '', [])
		)
		expect(state).toEqual({
			...initialState,
			orderNumber: 12345,
			createdOrder: order,
			loading: false,
		})
	})

	it('should handle clearOrder', () => {
		const stateWithOrder = { ...initialState, orderNumber: 12345 }
		const state = orderReducer(stateWithOrder, clearOrder())
		expect(state).toEqual(initialState)
	})
})
