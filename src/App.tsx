import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from './services/hooks';
import { RootState } from './services/store/store';
import { Ingredient, ConstructorIngredient } from './components/utils/types';
import Modal from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import OrderDetails from './components/order-details/order-details';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import styles from './App.module.css';
import { createOrder } from './services/api/orderApi'; 

function App() {
	const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);

	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [orderNumber, setOrderNumber] = useState<number | null>(null);

	
	const { bun, ingredients = [] } = useAppSelector(
		(state: RootState) => state.burgerConstructor
	);

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient);
		setIsIngredientModalOpen(true);
	};

	const handleCloseIngredientModal = () => {
		setIsIngredientModalOpen(false);
		setSelectedIngredient(null);
	};

	const handleOrderClick = async () => {
		if (!bun || ingredients.length === 0) return;

		const ingredientIds = [
			bun._id,
			...ingredients.map((item: ConstructorIngredient) => item._id),
			bun._id,
		];

		try {
			const orderNumber = await createOrder(ingredientIds);
			setOrderNumber(orderNumber);
			setIsOrderModalOpen(true);
		} catch (error) {
			console.error('Ошибка при оформлении заказа:', error);
		}
	};

	const handleCloseOrderModal = () => {
		setIsOrderModalOpen(false);
		setOrderNumber(null);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients onIngredientClick={handleOpenIngredientModal} />
					<BurgerConstructor onOrderClick={handleOrderClick} />
				</main>

				{/* Модальное окно для ингредиента */}
				{isIngredientModalOpen && selectedIngredient && (
					<Modal
						onClose={handleCloseIngredientModal}
						title='Детали ингредиента'>
						<IngredientDetails ingredient={selectedIngredient} />
					</Modal>
				)}

				{/* Модальное окно для заказа */}
				{isOrderModalOpen && (
					<Modal onClose={handleCloseOrderModal}>
						<OrderDetails orderNumber={orderNumber || 0} />
					</Modal>
				)}
			</div>
		</DndProvider>
	);
}

export default App;
