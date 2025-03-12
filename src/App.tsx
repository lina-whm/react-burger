import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Modal from './components/modal/modal'
import IngredientDetails from './components/ingredient-details/ingredient-details'
import OrderDetails from './components/order-details/order-details'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './App.module.css'
import { Ingredient } from './components/utils/types'

function App() {
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false)
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		setIsIngredientModalOpen(true)
	}

	//
	// const handleOpenOrderModal = () => {
	//   setIsOrderModalOpen(true);
	// };

	const handleCloseIngredientModal = () => {
		setIsIngredientModalOpen(false)
		setSelectedIngredient(null)
	}

	const handleCloseOrderModal = () => {
		setIsOrderModalOpen(false)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients onIngredientClick={handleOpenIngredientModal} />
					<BurgerConstructor /> {/* убрала onOrderClick */}
				</main>

				{isIngredientModalOpen && selectedIngredient && (
					<Modal onClose={handleCloseIngredientModal}>
						<IngredientDetails ingredient={selectedIngredient} />
					</Modal>
				)}

				{isOrderModalOpen && (
					<Modal onClose={handleCloseOrderModal}>
						<OrderDetails />
					</Modal>
				)}
			</div>
		</DndProvider>
	)
}

export default App
