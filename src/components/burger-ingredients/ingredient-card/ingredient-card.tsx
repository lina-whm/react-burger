import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css'
import { Ingredient } from '../../utils/types'

interface IngredientCardProps {
	ingredient: Ingredient
	onIngredientClick: () => void
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onIngredientClick,
}) => {
	return (
		<div className={styles.card} onClick={onIngredientClick}>
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={styles.image}
			/>
			<div className={styles.price}>
				<span className='text text_type_digits-default mr-2'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>
		</div>
	)
}

export default IngredientCard
