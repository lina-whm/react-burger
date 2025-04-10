import React from 'react'
import { useDrag } from 'react-dnd'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/hooks/useAppSelector'
import styles from './ingredient-card.module.css'
import { Ingredient } from '../../utils/types'

interface IngredientCardProps {
	ingredient: Ingredient
	onIngredientClick: (ingredient: Ingredient) => void
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onIngredientClick,
}) => {
	const { ingredients = [], bun } = useAppSelector(
		state => state.burgerConstructor
	)

	const [{ isDragging }, drag] = useDrag(() => ({
		type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
		item: { ingredient },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	}))

	const count = React.useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0
		}
		return ingredients.filter(item => item._id === ingredient._id).length
	}, [ingredient, bun, ingredients])

	return (
		<div
			ref={drag}
			className={`${styles.card} mb-8`}
			onClick={() => onIngredientClick(ingredient)}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			data-testid='ingredient-card'
		>
			{count > 0 && <div className={styles.count}>{count}</div>}
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={styles.image}
			/>
			<div className={`${styles.price} mt-1 mb-1`}>
				<span className='text text_type_digits-default mr-2'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className={`text text_type_main-default ${styles.name}`}>
				{ingredient.name}
			</p>
		</div>
	)
}

export default IngredientCard
