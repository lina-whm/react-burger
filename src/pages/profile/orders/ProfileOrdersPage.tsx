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
	const { isAuth, isLoading } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (isAuth && !isLoading) {
			const accessToken = localStorage
				.getItem('accessToken')
				?.replace('Bearer ', '')
			if (!accessToken) {
				return
			}

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
	}, [dispatch, isAuth, isLoading])

	if (isLoading) {
		return (
			<div className={`${styles.container} text text_type_main-default`}>
				Проверка авторизации...
			</div>
		)
	}

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
				Загружаем историю заказов...
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.ordersList}>
				{orders.length > 0 ? (
					orders
						.filter(order => order)
						.sort(
							(a, b) =>
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
						)
						.map(order => (
							<OrderCard key={order._id} order={order} showStatus={true} />
						))
				) : (
					<p className='text text_type_main-default'>У вас пока нет заказов</p>
				)}
			</div>
		</div>
	)
}

export default ProfileOrdersPage
