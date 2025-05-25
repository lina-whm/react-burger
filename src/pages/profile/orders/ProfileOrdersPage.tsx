import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/hooks'
import {
	wsConnect,
	wsDisconnect,
} from '../../../services/slices/ordersFeedSlice'
import OrderCard from '../../../components/order-card/order-card'
import styles from './profile-orders.module.css'
import { getCookie } from '../../../services/utils/cookies'

const ProfileOrdersPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { orders, wsConnected, error } = useAppSelector(
		state => state.ordersFeed
	)

	useEffect(() => {
		const token = localStorage.getItem('accessToken')?.replace('Bearer ', '')
		if (!token) return

		dispatch(
			wsConnect({
				url: `wss://norma.nomoreparties.space/orders?token=${token}`,
				withToken: true,
			})
		)

		return () => {
			dispatch(wsDisconnect())
		}
	}, [dispatch])

	if (error) {
		return (
			<div className={`${styles.container} text text_type_main-default`}>
				Ошибка подключения: {error}
			</div>
		)
	}

	if (!wsConnected) {
		return (
			<div className={`${styles.container} text text_type_main-default`}>
				Подключаемся к истории заказов...
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.ordersList}>
				{orders
					.filter(order => order)
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
					.map(order => (
						<OrderCard key={order._id} order={order} showStatus={true} />
					))}
			</div>
		</div>
	)
}

export default ProfileOrdersPage
