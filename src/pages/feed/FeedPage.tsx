import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { useNavigate, useLocation } from 'react-router-dom'
import {
	wsConnectionStart,
	wsConnectionClosed,
} from '../../services/slices/ordersFeedSlice'
import OrderCard from '../../components/order-card/order-card'
import styles from './feed.module.css'
import { Order } from '../../services/types'

const FeedPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const { orders, total, totalToday, wsConnected } = useAppSelector(
		state => state.ordersFeed
	)

	const handleOpenOrderModal = (orderNumber: number) => {
		navigate(`/feed/${orderNumber}`, {
			state: { background: location },
		})
	}

	useEffect(() => {
		dispatch(
			wsConnectionStart({
				url: 'wss://stellarburgers.education-services.ru/orders/all',
				withToken: false,
			})
		)

		return () => {
			dispatch(wsConnectionClosed())
		}
	}, [dispatch])

	if (!wsConnected) {
		return (
			<div className='text text_type_main-default'>
				Подключаемся к ленте заказов...
			</div>
		)
	}

	const displayedOrders = orders.slice(0, 10)

	const doneOrdersNumbers = displayedOrders
		.filter(order => order.status === 'done')
		.slice(0, 5)
		.map(order => order.number)

	const pendingOrdersNumbers = displayedOrders
		.filter(order => order.status === 'pending')
		.slice(0, 5)
		.map(order => order.number)

	return (
		<div className={styles.container}>
			<h1 className={`text text_type_main-large ${styles.title}`}>
				Лента заказов
			</h1>

			<div className={styles.ordersList}>
				{displayedOrders.map(order => (
					<OrderCard
						key={order._id}
						order={order}
						showStatus={false}
						onClick={() => handleOpenOrderModal(order.number)}
					/>
				))}
				{displayedOrders.length === 0 && (
					<div className='text text_type_main-default'>
						Заказов пока нет. Создайте свой первый заказ!
					</div>
				)}
			</div>

			<div className={styles.statsContainer}>
				<div className={styles.statusColumns}>
					<div className={styles.statusColumn}>
						<h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
						<div className={styles.doneList}>
							{doneOrdersNumbers.map(number => (
								<span
									key={number}
									className='text text_type_digits-large'
								>
									{number}
								</span>
							))}
						</div>
					</div>

					<div className={styles.statusColumn}>
						<h2 className='text text_type_main-medium mb-6'>В работе:</h2>
						<div className={styles.pendingList}>
							{pendingOrdersNumbers.map(number => (
								<span
									key={number}
									className='text text_type_digits-large'
								>
									{number}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className={styles.total}>
					<h2 className='text text_type_main-medium'>
						Выполнено за всё время:
					</h2>
					<span className={`${styles.totalNumber} text text_type_digits-large`}>
						{total > 0 ? total : 377732}
					</span>
				</div>

				<div className={styles.total}>
					<h2 className='text text_type_main-medium'>
						Выполнено за сегодня:
					</h2>
					<span className={`${styles.totalTodayNumber} text text_type_digits-large`}>
						{totalToday > 0 ? totalToday : 231}
					</span>
				</div>
			</div>
		</div>
	)
}

export default FeedPage