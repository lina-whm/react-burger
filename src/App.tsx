import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAppSelector } from './services/hooks/useAppSelector'
import { RootState } from './services/store/store'
import { Ingredient } from './components/utils/types'
import { createOrder } from './services/api/orderApi'
import Modal from './components/modal/modal'
import IngredientDetails from './components/ingredient-details/ingredient-details'
import OrderDetails from './components/order-details/order-details'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './App.module.css'

function App() {
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false)
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)
	const [orderNumber, setOrderNumber] = useState<{ number: number } | null>(
		null
	)

	const { bun, ingredients = [] } = useAppSelector(
		(state: RootState) => state.burgerConstructor
	)

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		setIsIngredientModalOpen(true)
	}

	const handleCloseIngredientModal = () => {
		setIsIngredientModalOpen(false)
		setSelectedIngredient(null)
	}

	const _handleOrderClick = async () => {
		if (!bun || ingredients.length === 0) return

		try {
			const ingredientIds = [
				bun._id,
				...ingredients.map(item => item._id),
				bun._id,
			]
			const response = await createOrder(ingredientIds)
			setOrderNumber({ number: response.order.number })
		} catch (error) {
			console.error('Ошибка при оформлении заказа:', error)
		}
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients onIngredientClick={handleOpenIngredientModal} />
					<BurgerConstructor />
				</main>

				{isIngredientModalOpen && selectedIngredient && (
					<Modal
						onClose={handleCloseIngredientModal}
						title='Детали ингредиента'
					>
						<IngredientDetails ingredient={selectedIngredient} />
					</Modal>
				)}

				{orderNumber && (
					<Modal onClose={() => setOrderNumber(null)}>
						<OrderDetails orderNumber={orderNumber.number} />
					</Modal>
				)}
			</div>
		</DndProvider>
	)
}

export default App
