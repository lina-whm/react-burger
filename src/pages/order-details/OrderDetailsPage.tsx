import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../services/hooks'
import { fetchOrder } from '../../services/api/orderApi'
import OrderDetailsFull from '../../components/order-details-full/order-details-full'

const OrderDetailsPage: React.FC = () => {
	const { number } = useParams()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (number) {
			dispatch(fetchOrder(number) as any)
		}
	}, [dispatch, number])

	return (
		<div className='mt-30'>
			<OrderDetailsFull />
		</div>
	)
}

export default OrderDetailsPage
