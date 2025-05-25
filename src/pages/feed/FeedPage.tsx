import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { wsConnect, wsDisconnect } from '../../services/slices/ordersFeedSlice'
import OrderCard from '../../components/order-card/order-card'
import styles from './feed.module.css'


const FeedPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const { orders, total, totalToday, wsConnected, error } = useAppSelector(
		state => state.ordersFeed
	)

	useEffect(() => {
		dispatch(
			wsConnect({
				url: 'wss://norma.nomoreparties.space/orders/all',
				withToken: false,
			})
		)

		return () => {
			dispatch(wsDisconnect())
		}
	}, [dispatch])

	if (error) {
		return <div>Ошибка подключения: {error}</div>
	}

	if (!wsConnected) {
		return <div>Подключаемся к ленте заказов...</div>
	}

	const doneOrders = orders
		.filter(order => order.status === 'done')
		.slice(0, 10)
		.map(order => order.number)

	const pendingOrders = orders
		.filter(order => order.status === 'pending')
		.slice(0, 10)
		.map(order => order.number)

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
			<div className={styles.columns}>
				<div className={styles.ordersList}>
					{orders.map(order => (
						<OrderCard key={order._id} order={order} />
					))}
				</div>
				<div className={styles.statsContainer}>
					<div className={styles.statusColumns}>
						<div className={styles.statusColumn}>
							<h2 className='text text_type_main-medium mb-6'>Готовы:</h2>
							<div className={styles.doneList}>
								{doneOrders.map(number => (
									<span key={number} className='text text_type_digits-default'>
										{number}
									</span>
								))}
							</div>
						</div>
						<div className={styles.statusColumn}>
							<h2 className='text text_type_main-medium mb-6'>В работе:</h2>
							<div className={styles.pendingList}>
								{pendingOrders.map(number => (
									<span key={number} className='text text_type_digits-default'>
										{number}
									</span>
								))}
							</div>
						</div>
					</div>
					<div className={styles.total}>
						<h2 className='text text_type_main-medium'>
							Выполнено за все время:
						</h2>
						<span
							className={`${styles.totalNumber} text text_type_digits-large`}
						>
							{total}
						</span>
					</div>
					<div className={styles.total}>
						<h2 className='text text_type_main-medium'>
							Выполнено за сегодня:
						</h2>
						<span
							className={`${styles.totalNumber} text text_type_digits-large`}
						>
							{totalToday}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedPage
