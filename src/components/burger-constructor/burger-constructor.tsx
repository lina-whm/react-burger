import React from 'react'
import { useDrop } from 'react-dnd'
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import {
	addIngredient,
	clearConstructor,
	moveIngredient,
} from '../../services/slices/constructorSlice'
import { createOrder } from '../../services/slices/orderSlice'
import DraggableIngredient from './draggable-ingredient'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'
import classNames from 'classnames'
import { ConstructorIngredient } from '../../components/utils/types'

const BurgerConstructor: React.FC = () => {
	const dispatch = useAppDispatch()
	const { bun, ingredients } = useAppSelector(state => state.burgerConstructor)
	const { orderNumber, loading } = useAppSelector(state => state.order)
	const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false)

	const [{ isHover }, drop] = useDrop(() => ({
		accept: ['ingredient', 'bun'],
		drop: (item: { ingredient: ConstructorIngredient }) => {
			dispatch(addIngredient(item.ingredient))
		},
		collect: monitor => ({
			isHover: monitor.isOver(),
		}),
	}))

const handleOrderClick = async () => {
	if (!bun || ingredients.length === 0) return

	try {
		// Фильтруем null/undefined
		const ingredientIds = [
			bun._id,
			...ingredients
				.map(item => item?._id) // только _id
				.filter(id => id != null), // удалила null/undefined
			bun._id,
		].filter(Boolean) // доп фильтрация

		await dispatch(createOrder(ingredientIds)).unwrap()
		setIsOrderModalOpen(true)
		dispatch(clearConstructor())
	} catch (error) {
		console.error('Ошибка оформления заказа:', error)
	}
}

	const moveCard = (dragIndex: number, hoverIndex: number) => {
		if (dragIndex === hoverIndex) return
		dispatch(moveIngredient({ dragIndex, hoverIndex }))
	}

	const totalPrice = React.useMemo(() => {
		const ingredientsSum = ingredients.reduce(
			(sum, item) => sum + (item?.price || 0),
			0
		)
		const bunSum = bun ? bun.price * 2 : 0
		return ingredientsSum + bunSum
	}, [bun, ingredients])

	return (
		<div
			ref={drop}
			className={classNames(styles.constructor, { [styles.hover]: isHover })}
			data-testid='burger-constructor'
		>
			{/* Верхняя булка */}
			<div className={classNames(styles.bunSection, styles.top)}>
				{bun ? (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div
						className={classNames(
							styles.placeholder,
							'text text_type_main-default'
						)}
					>
						Перетащите булку (верх)
					</div>
				)}
			</div>

			{/* Список ингредиентов */}
			<div
				className={styles.ingredientsList}
				style={{ maxHeight: ingredients.length > 4 ? '464px' : 'auto' }}
			>
				{ingredients
					.filter(ing => ing && ing._id) // Фильтруем пустые ингредиенты
					.map((item, index) => (
						<DraggableIngredient
							key={item.uniqueId}
							ingredient={item}
							index={index}
							moveCard={moveCard}
						/>
					))}
				{ingredients.length === 0 && (
					<div
						className={classNames(
							styles.placeholder,
							'text text_type_main-default'
						)}
					>
						Перетащите начинку
					</div>
				)}
			</div>

			{/* Нижняя булка */}
			<div className={classNames(styles.bunSection, styles.bottom)}>
				{bun ? (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div
						className={classNames(
							styles.placeholder,
							'text text_type_main-default'
						)}
					>
						Перетащите булку (низ)
					</div>
				)}
			</div>

			{/* Итого */}
			<div className={styles.total}>
				<div className={styles.totalPrice}>
					<span className='text text_type_digits-medium'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleOrderClick}
					disabled={!bun || ingredients.length === 0 || loading}
				>
					{loading ? 'Оформляем...' : 'Оформить заказ'}
				</Button>
			</div>

			{isOrderModalOpen && orderNumber && (
				<Modal onClose={() => setIsOrderModalOpen(false)}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</div>
	)
}

export default BurgerConstructor
