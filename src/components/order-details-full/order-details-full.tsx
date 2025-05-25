import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../services/hooks'
import { Ingredient } from '../../services/types'
import styles from './order-details-full.module.css'

const OrderDetailsFull: React.FC = () => {
	const { number } = useParams()
	const { orders } = useAppSelector(state => state.ordersFeed)
	const { items: ingredients } = useAppSelector(state => state.ingredients)

	const order = orders.find(o => o.number === Number(number))

	if (!order) {
		return <div>Загрузка...</div>
	}

	const orderIngredients = order.ingredients
		.map(id => ingredients.find(ing => ing._id === id))
		.filter(Boolean) as Ingredient[]

	const uniqueIngredients = Array.from(new Set(orderIngredients))

	const totalPrice = orderIngredients.reduce((sum, ing) => sum + ing.price, 0)

	const statusText =
		order.status === 'done'
			? 'Выполнен'
			: order.status === 'pending'
			? 'Готовится'
			: order.status === 'created'
			? 'Создан'
			: 'Отменен'

	return (
		<div className={styles.container}>
			<p className={`${styles.number} text text_type_digits-default`}>
				#{order.number}
			</p>
			<h1 className='text text_type_main-medium mt-10'>{order.name}</h1>
			<p
				className={`text text_type_main-default mt-3 ${
					order.status === 'done' ? styles.done : ''
				}`}
			>
				{statusText}
			</p>
			<h2 className='text text_type_main-medium mt-15'>Состав:</h2>
			<div className={`${styles.ingredients} mt-6`}>
				{uniqueIngredients.map(ing => {
					const count = orderIngredients.filter(i => i._id === ing._id).length
					return (
						<div key={ing._id} className={styles.ingredient}>
							<div className={styles.imageContainer}>
								<img src={ing.image} alt={ing.name} className={styles.image} />
							</div>
							<p className={`${styles.name} text text_type_main-default`}>
								{ing.name}
							</p>
							<div className={styles.price}>
								<span className='text text_type_digits-default mr-2'>
									{count} x {ing.price}
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
