import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../services/hooks/useAppSelector'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-details-full.module.css'
import { OrderStatus } from '../../services/types'

const OrderDetailsFull: React.FC = () => {
	const { number } = useParams<{ number: string }>()
	const { orders } = useAppSelector(state => state.ordersFeed)
	const { items: ingredients } = useAppSelector(state => state.ingredients)

	const order = orders.find(o => o.number === Number(number))

	if (!order) return null

	const orderIngredientsList = order.ingredients
		.map(id => ingredients.find(ing => ing._id === id))
		.filter(Boolean)

	const uniqueIngredients = Array.from(new Set(orderIngredientsList))

	const totalPrice = orderIngredientsList.reduce(
		(sum, ing) => sum + (ing?.price || 0),
		0
	)

	const statusText: Record<OrderStatus, string> = {
		done: 'Выполнен',
		pending: 'Готовится',
		created: 'Создан',
		cancelled: 'Отменен',
	}

	return (
		<div className={styles.container}>
			<p className={`${styles.number} text text_type_digits-large`}>
				#{order.number}
			</p>
			<h1 className='text text_type_main-medium mt-10'>{order.name}</h1>
			<p
				className={`text text_type_main-default mt-3 ${
					order.status === 'done' ? styles.done : ''
				}`}
			>
				{statusText[order.status]}
			</p>
			<h2 className='text text_type_main-medium mt-15'>Состав:</h2>
			<div className={`${styles.ingredients} mt-6`}>
				{uniqueIngredients.map(ing => {
					const count = orderIngredientsList.filter(i => i?._id === ing?._id).length
					return (
						<div key={ing?._id} className={styles.ingredient}>
							<div className={styles.ingredientInfo}>
								<div className={styles.imageContainer}>
									<img src={ing?.image} alt={ing?.name} className={styles.image} />
								</div>
								<p className={`${styles.name} text text_type_main-default`}>
									{ing?.name}
								</p>
							</div>
							<div className={styles.priceInfo}>
								<span className='text text_type_digits-default'>
									{count} x {ing?.price}
								</span>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					)
				})}
			</div>
			<div className={`${styles.footer} mt-10`}>
				<p className='text text_type_main-default text_color_inactive'>
					{new Date(order.createdAt).toLocaleString()}
				</p>
				<div className={styles.total}>
					<span className='text text_type_digits-default mr-2'>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	)
}

export default OrderDetailsFull