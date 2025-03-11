import React from 'react'
import styles from './ingredient-details.module.css'

interface IngredientDetailsProps {
	ingredient: {
		image: string
		name: string
		calories: number
		proteins: number
		fat: number
		carbohydrates: number
	}
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
			<h2 className={styles.name}>{ingredient.name}</h2>
			<div className={styles.nutrition}>
				<div className={styles.nutritionItem}>
					<span className={styles.nutritionLabel}>Калории, ккал</span>
					<span className={styles.nutritionValue}>{ingredient.calories}</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className={styles.nutritionLabel}>Белки, г</span>
					<span className={styles.nutritionValue}>{ingredient.proteins}</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className={styles.nutritionLabel}>Жиры, г</span>
					<span className={styles.nutritionValue}>{ingredient.fat}</span>
				</div>
				<div className={styles.nutritionItem}>
					<span className={styles.nutritionLabel}>Углеводы, г</span>
					<span className={styles.nutritionValue}>
						{ingredient.carbohydrates}
					</span>
				</div>
			</div>
		</div>
	)
}

export default IngredientDetails
