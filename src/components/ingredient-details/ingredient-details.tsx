import React from 'react'
import styles from './ingredient-details.module.css'
import { Ingredient } from '../../components/utils/types'

interface IngredientDetailsProps {
	ingredient: Ingredient
}

const IngredientDetails: React.FC<IngredientDetailsProps> = ({
	ingredient,
}) => {
	return (
		<div className={styles.details}>
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={styles.image}
			/>
			<h2 className='text text_type_main-medium mt-4 mb-8'>
				{ingredient.name}
			</h2>
			<div className={styles.nutrition}>
				<div className={styles.nutritionItem}>
					<span className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{ingredient.calories}
					</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className='text text_type_main-default text_color_inactive'>
						Белки, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{ingredient.proteins}
					</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{ingredient.fat}
					</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</span>
					<span className='text text_type_digits-default text_color_inactive'>
						{ingredient.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	)
}

export default IngredientDetails
