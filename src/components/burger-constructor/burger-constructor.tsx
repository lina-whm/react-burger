import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'
import {
	addIngredient,
	moveIngredient,
} from '../../services/slices/constructorSlice'
import { createOrder } from '../../services/slices/orderSlice'
import styles from './burger-constructor.module.css'
import { Ingredient, RootState } from '../../components/utils/types'
import { useAppDispatch } from '../../services/hooks/useAppDispatch'
import DraggableIngredient from 'components/burger-constructor/draggable-ingredient'

const BurgerConstructor = () => {
	const dispatch = useAppDispatch()
	const { bun, ingredients } = useSelector(
		(state: RootState) => state.constructor
	)
	const { status } = useSelector((state: RootState) => state.order) 

	
	const [, drop] = useDrop({
		accept: 'INGREDIENT',
		drop: (item: Ingredient) => {
			dispatch(addIngredient(item))
		},
	})

	
	const moveCard = (dragIndex: number, hoverIndex: number) => {
		dispatch(moveIngredient({ dragIndex, hoverIndex }))
	}

	
	const totalPrice = useMemo(() => {
		const ingredientsPrice = ingredients.reduce(
			(sum, ingredient) => sum + ingredient.price,
			0
		)
		const bunPrice = bun ? bun.price * 2 : 0
		return ingredientsPrice + bunPrice
	}, [ingredients, bun])

	
	const handleOrderClick = () => {
		const ingredientIds = [
			bun?._id,
			...ingredients.map(ingredient => ingredient._id),
			bun?._id,
		].filter(Boolean) as string[]

		dispatch(createOrder(ingredientIds))
	}

	return (
		<section ref={drop} className={classNames(styles.constructor)}>
			{/* Верхняя булка */}
			{bun && (
				<div className={classNames(styles.bun)}>
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
				{ingredients.map((ingredient, index) => (
					<DraggableIngredient
						key={ingredient._id}
						ingredient={ingredient}
						index={index}
						moveCard={moveCard}
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
					disabled={!bun || ingredients.length === 0 || status === 'loading'}
				>
					{status === 'loading' ? 'Оформляем заказ...' : 'Оформить заказ'}
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor
