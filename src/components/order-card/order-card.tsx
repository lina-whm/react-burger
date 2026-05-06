import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from './../utils/date'
import { useAppSelector } from '../../services/hooks/useAppSelector'
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
				<span className={`text text_type_main-default ${styles.date}`}>
					{formatDate(order.createdAt)}
				</span>
			</div>

			<h3 className={`${styles.title} text text_type_main-medium`}>
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
				{orderIngredients.length > 0 ? (
					<div className={styles.ingredients}>
						{visibleIngredients.map((ingredient, index) => (
							<div
								key={index}
								className={styles.ingredientImage}
								style={{
									zIndex: maxIngredients - index,
									left: `${index * 48}px`,
								}}
							>
								<img
									src={ingredient.image_mobile}
									alt={ingredient.name}
									className={styles.ingredientImg}
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
								<span className={`text text_type_main-default ${styles.moreText}`}>
									+{hiddenIngredientsCount}
								</span>
							</div>
						)}
					</div>
				) : (
					<span className='text text_type_main-default text_color_inactive'>
						{order.ingredients.length} ингредиентов
					</span>
				)}

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