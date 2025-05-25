import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../services/hooks'
import OrderDetailsFull from '../order-details-full/order-details-full'

const OrderDetailsModal: React.FC = () => {
	const { number } = useParams()
	const { orders } = useAppSelector(state => state.ordersFeed)

	const order = orders.find(o => o.number === Number(number))

	if (!order) {
		return <div>Загрузка...</div>
	}

	return <OrderDetailsFull />
}

export default OrderDetailsModal
