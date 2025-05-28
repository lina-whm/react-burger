import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import { Order } from '../types'

export const fetchOrder = createAsyncThunk(
	'orders/fetchOrder',
	async (number: string, { rejectWithValue }) => {
		try {
			const response = await request<{
				success: boolean
				orders: Order[]
			}>(`/orders/${number}`)

			console.log('API Response:', response)

			if (
				!response.success ||
				!response.orders ||
				response.orders.length === 0
			) {
				return rejectWithValue('Заказ не найден')
			}
			return response.orders[0]
		} catch (error: any) {
			console.error('API Error:', error) 
			return rejectWithValue(error.message || 'Ошибка при загрузке заказа')
		}
	}
)
