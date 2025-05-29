import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import OrderDetailsFull from '../../components/order-details-full/order-details-full'
import { fetchOrder } from '../../services/api/orderApi'
import {
	selectOrderByNumber,
	selectOrdersLoading,
} from '../../services/slices/ordersFeedSlice'

const OrderDetailsPage: React.FC = () => {
	const { number } = useParams<{ number: string }>()
	const dispatch = useAppDispatch()
	const order = useAppSelector(state =>
		selectOrderByNumber(state, Number(number))
	)
	const loading = useAppSelector(selectOrdersLoading)

	useEffect(() => {
		if (number) {
			dispatch(fetchOrder(number))
		}
	}, [number, dispatch])

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<p className='text text_type_main-default'>Загрузка данных заказа...</p>
			</div>
		)
	}

	if (!order) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<p className='text text_type_main-default'>Заказ #{number} не найден</p>
			</div>
		)
	}

	return <OrderDetailsFull />
}

export default OrderDetailsPage
