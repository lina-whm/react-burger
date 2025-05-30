import ordersFeedSlice, {
	wsConnectionStart,
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClosed,
	wsGetOrders,
} from './ordersFeedSlice'
import { Order } from '../types'

const initialState = ordersFeedSlice(undefined, { type: '' })

const mockOrder: Order = {
	_id: '1',
	ingredients: ['1', '2'],
	status: 'done',
	name: 'Order 1',
	createdAt: '2023-01-01',
	updatedAt: '2023-01-01',
	number: 1,
}

describe('ordersFeedSlice', () => {
	it('should return initial state', () => {
		expect(ordersFeedSlice(undefined, { type: '' })).toEqual(initialState)
	})

	it('should handle wsConnectionStart', () => {
		const state = ordersFeedSlice(
			initialState,
			wsConnectionStart({ url: 'ws://test', withToken: false })
		)
		expect(state).toEqual({
			...initialState,
			connecting: true,
			error: undefined,
		})
	})

	it('should handle wsConnectionSuccess', () => {
		const state = ordersFeedSlice(initialState, wsConnectionSuccess())
		expect(state).toEqual({
			...initialState,
			wsConnected: true,
			connecting: false,
		})
	})

	it('should handle wsGetOrders', () => {
		const mockData = {
			orders: [mockOrder],
			total: 1,
			totalToday: 1,
			success: true,
		}
		const state = ordersFeedSlice(initialState, wsGetOrders(mockData))
		expect(state.orders).toEqual([mockOrder])
		expect(state.total).toBe(1)
	})
})
