import React, { useState } from 'react'
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames' 
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import styles from './burger-constructor.module.css'

interface Ingredient {
	_id: string
	name: string
	type: string
	price: number
	image: string
}

interface BurgerConstructorProps {
	selectedIngredients: Ingredient[]
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
	selectedIngredients,
}) => {
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

	const buns = selectedIngredients.filter(
		ingredient => ingredient.type === 'bun'
	)
	const otherIngredients = selectedIngredients.filter(
		ingredient => ingredient.type !== 'bun'
	)

	const totalPrice = selectedIngredients.reduce(
		(sum, ingredient) => sum + ingredient.price,
		0
	)

	const handleOrderClick = () => {
		setIsOrderModalOpen(true)
	}

	const closeModal = () => {
		setIsOrderModalOpen(false)
	}

	return (
		<section className={classNames(styles.constructor)}>
			{/* Верхняя булка */}
			{buns.length > 0 && (
				<div className={classNames(styles.bun, styles.bunTop)}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${buns[0].name} (верх)`}
						price={buns[0].price}
						thumbnail={buns[0].image}
					/>
				</div>
			)}

			{/* Список ингредиентов */}
			<div className={classNames(styles.ingredientsList)}>
				{otherIngredients.map((ingredient, index) => (
					<div key={index} className={classNames(styles.ingredientItem)}>
						<ConstructorElement
							text={ingredient.name}
							price={ingredient.price}
							thumbnail={ingredient.image}
						/>
					</div>
				))}
			</div>

			{/* Нижняя булка */}
			{buns.length > 0 && (
				<div className={classNames(styles.bun)}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${buns[0].name} (низ)`}
						price={buns[0].price}
						thumbnail={buns[0].image}
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
