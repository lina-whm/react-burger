import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from './../utils/date'
import { useAppSelector } from '../../services/hooks'
import { Order, Ingredient } from '../../services/types'
import styles from './order-card.module.css'

interface OrderCardProps {
	order: Order
	showStatus?: boolean
	maxIngredients?: number
	onClick?: () => void
}
const OrderCard: React.FC<OrderCardProps> = ({
	order,
	showStatus = false,
	maxIngredients = 6,
	onClick,
}) => {
	const location = useLocation()
	const { items: ingredients } = useAppSelector(state => state.ingredients)

	const orderIngredients = order.ingredients
		.map(id => ingredients.find(ing => ing._id === id))
		.filter((ing): ing is Ingredient => ing !== undefined)

	const visibleIngredients = orderIngredients.slice(0, maxIngredients)
	const hiddenIngredientsCount = orderIngredients.length - maxIngredients

	const totalPrice = orderIngredients.reduce((sum, ing) => sum + ing.price, 0)

	const statusText =
		{
			done: 'Выполнен',
			pending: 'Готовится',
			created: 'Создан',
			cancelled: 'Отменён',
		}[order.status] || order.status

	const basePath = location.pathname.startsWith('/profile')
		? '/profile/orders'
		: '/feed'

	return (
		<Link
			to={`${basePath}/${order.number}`}
			state={{ background: location }}
			className={styles.card}
			onClick={onClick}
		>
			<div className={styles.header}>
				<span className='text text_type_digits-default'>
					#{order.number.toString().padStart(6, '0')}
				</span>
				<span className='text text_type_main-default text_color_inactive'>
					{formatDate(order.createdAt)}
				</span>
			</div>

			<h3 className={`${styles.title} text text_type_main-medium mt-6`}>
				{order.name}
			</h3>

			{showStatus && (
				<p
					className={`text text_type_main-default mt-2 ${
						order.status === 'done' ? styles.done : ''
					}`}
				>
					{statusText}
				</p>
			)}

			<div className={styles.footer}>
				<div className={styles.ingredients}>
					{visibleIngredients.map((ingredient, index) => (
						<div
							key={index}
							className={styles.ingredient}
							style={{
								zIndex: maxIngredients - index,
								left: `${index * 48}px`,
							}}
						>
							<img
								src={ingredient.image_mobile}
								alt={ingredient.name}
								className={styles.image}
							/>
						</div>
					))}
					{hiddenIngredientsCount > 0 && (
						<div
							className={styles.moreIngredients}
							style={{
								left: `${visibleIngredients.length * 48}px`,
								zIndex: maxIngredients - visibleIngredients.length,
							}}
						>
							<span
								className={`${styles.moreText} text text_type_main-default`}
							>
								+{hiddenIngredientsCount}
							</span>
						</div>
					)}
				</div>

				<div className={styles.price}>
					<span className='text text_type_digits-default mr-2'>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</Link>
	)
}

export default OrderCard
