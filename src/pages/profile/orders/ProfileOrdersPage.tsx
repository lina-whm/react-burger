import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/hooks'
import {
	wsConnectionStart,
	wsConnectionClosed,
} from '../../../services/slices/ordersFeedSlice'
import OrderCard from '../../../components/order-card/order-card'
import styles from './profile-orders.module.css'

const ProfileOrdersPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { orders, wsConnected, error } = useAppSelector(
		state => state.ordersFeed
	)
	const { isAuth } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (isAuth) {
			dispatch(
				wsConnectionStart({
					url: 'wss://norma.nomoreparties.space/orders',
					withToken: true,
				})
			)
		}

		return () => {
			dispatch(wsConnectionClosed())
		}
	}, [dispatch, isAuth])

	if (!isAuth) {
		return (
			<div className={`${styles.container} text text_type_main-default`}>
				Пожалуйста, авторизуйтесь
			</div>
		)
	}

	if (error) {
		return (
			<div className={`${styles.container} text text_type_main-default`}>
				Ошибка: {error}
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
