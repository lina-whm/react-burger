import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './burger-ingredients.module.css'
import { RootState } from '../../services/store/store'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { Ingredient } from '../utils/types'
import { fetchIngredients } from '../../services/slices/ingredientsSlice'
import { useAppDispatch } from '../../services/hooks/useAppDispatch'

interface BurgerIngredientsProps {
	onIngredientClick: (ingredient: Ingredient) => void
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
	onIngredientClick,
}) => {
	const dispatch = useAppDispatch()
	const { items, loading, error } = useSelector(
		(state: RootState) => state.ingredients
	)
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)

	useEffect(() => {
		dispatch(fetchIngredients())
	}, [dispatch])

	const handleIngredientClick = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		onIngredientClick(ingredient)
	}

	const handleCloseModal = () => {
		setSelectedIngredient(null)
	}

	if (loading) return <p>Загрузка...</p>
	if (error) return <p>Ошибка: {error}</p>

	return (
		<section className={styles.ingredients}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
			<div className={styles.ingredientsList}>
				{items.map((ingredient: Ingredient) => (
					<IngredientCard
						key={ingredient._id}
						ingredient={ingredient}
						onIngredientClick={() => handleIngredientClick(ingredient)}
					/>
				))}
			</div>

			{selectedIngredient && (
				<Modal onClose={handleCloseModal}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	)
}

export default BurgerIngredients
