import React, { useCallback, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import {
	addIngredient,
	removeIngredient,
	moveIngredient,
} from '../../services/slices/constructorSlice'
import { ConstructorIngredient } from './../utils/types'
import DraggableIngredient from './draggable-ingredient'
import styles from './burger-constructor.module.css'

const BurgerConstructor: React.FC = () => {
	const dispatch = useAppDispatch()
	const { bun, ingredients } = useAppSelector(state => state.constructor)
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

	const ref = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop({
		accept: 'ingredient',
		drop: (item: Omit<ConstructorIngredient, 'uuid'>) => {
			dispatch(addIngredient(item))
		},
	})

	
	drop(ref)

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(moveIngredient({ dragIndex, hoverIndex }))
		},
		[dispatch]
	)

	const totalPrice = React.useMemo(() => {
		const ingredientsSum = (ingredients || []).reduce(
			(sum, item) => sum + item.price,
			0
		)
		const bunSum = bun ? bun.price * 2 : 0
		return ingredientsSum + bunSum
	}, [bun, ingredients])

	const handleOrderClick = () => {
		setIsOrderModalOpen(true)
	}

	const closeModal = () => {
		setIsOrderModalOpen(false)
	}

	return (
		<section className={classNames(styles.constructor)} ref={ref}>
			{/* Верхняя булка */}
			{bun && (
				<div className={classNames(styles.bun, styles.bunTop)}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			{/* Список ингредиентов */}
			<div className={classNames(styles.ingredientsList)}>
				{(ingredients || []).map((ingredient, index) => (
					<DraggableIngredient
						key={ingredient.uuid}
						ingredient={ingredient}
						index={index}
						moveCard={moveCard}
						onRemove={() => dispatch(removeIngredient(ingredient.uuid))}
					/>
				))}
			</div>

			{/* Нижняя булка */}
			{bun && (
				<div className={classNames(styles.bun)}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			{/* Итоговая стоимость и кнопка */}
			<div className={classNames(styles.total)}>
				<div className={classNames(styles.totalPrice)}>
					<span className={classNames('text', 'text_type_digits-medium')}>
						{totalPrice}
					</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button
					type='primary'
					size='large'
					htmlType='button'
					onClick={handleOrderClick}
					disabled={!bun || (ingredients || []).length === 0}
				>
					Оформить заказ
				</Button>
			</div>

			{/* Модальное окно с деталями заказа */}
			{isOrderModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	)
}

export default BurgerConstructor
