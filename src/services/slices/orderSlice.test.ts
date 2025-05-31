import orderReducer, { createOrder, clearOrder } from './orderSlice'

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
		const orderNumber = 12345
		const state = orderReducer(
			initialState,
			createOrder.fulfilled(orderNumber, '', [])
		)
		expect(state).toEqual({
			...initialState,
			orderNumber,
			loading: false,
		})
	})

	it('should handle clearOrder', () => {
		const stateWithOrder = { ...initialState, orderNumber: 12345 }
		const state = orderReducer(stateWithOrder, clearOrder())
		expect(state).toEqual(initialState)
	})
})
