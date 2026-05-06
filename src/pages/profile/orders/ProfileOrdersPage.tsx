import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../services/hooks'
import {
	wsConnectionStart,
	wsConnectionClosed,
} from '../../../services/slices/ordersFeedSlice'
import OrderCard from '../../../components/order-card/order-card'
import styles from './profile-orders.module.css'
import navStyles from '../profile.module.css'

const ProfileOrdersPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const { orders, wsConnected, error } = useAppSelector(
		state => state.ordersFeed
	)
	const { isAuth, isLoading } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (isAuth && !isLoading) {
			const accessToken = localStorage
				.getItem('accessToken')
				?.replace('Bearer ', '')
			if (accessToken) {
				dispatch(
					wsConnectionStart({
						url: 'wss://stellarburgers.education-services.ru/orders',
						withToken: true,
					})
				)
			}
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
		<div className={navStyles.container}>
			<div className={navStyles.sidebar}>
				<nav className={navStyles.nav}>
					<Link
						to='/profile'
						className={`${navStyles.link} text text_type_main-medium`}
					>
						Профиль
					</Link>
					<Link
						to='/profile/orders'
						className={`${navStyles.link} text text_type_main-medium ${navStyles.active}`}
					>
						История заказов
					</Link>
					<button
						onClick={() => {
							localStorage.removeItem('accessToken')
							localStorage.removeItem('refreshToken')
							window.location.href = '/login'
						}}
						className={`${navStyles.link} text text_type_main-medium`}
					>
						Выход
					</button>
				</nav>
			</div>

			<div className={styles.content}>
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
		</div>
	)
}

export default ProfileOrdersPage