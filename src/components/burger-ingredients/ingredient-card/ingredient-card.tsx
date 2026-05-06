import React from 'react'
import { useDrag } from 'react-dnd'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/hooks/useAppSelector'
import styles from './ingredient-card.module.css'
import { Ingredient } from '../../utils/types'

interface IngredientCardProps {
	ingredient: Ingredient
	onIngredientClick: (ingredient: Ingredient) => void
	onAddClick?: () => void
	onRemoveClick?: () => void
	count?: number
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onIngredientClick,
	onAddClick,
	onRemoveClick,
	count: externalCount,
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

	const internalCount = React.useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0
		}
		return ingredients.filter(item => item._id === ingredient._id).length
	}, [ingredient, bun, ingredients])

	const count = externalCount !== undefined ? externalCount : internalCount
	const isAdded = count > 0

	const handleAddClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onAddClick?.()
	}

	const handleRemoveClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		onRemoveClick?.()
	}

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
			{onRemoveClick && count > 0 && (
				<button
					className={styles.removeButton}
					onClick={handleRemoveClick}
					aria-label='Убрать из бургера'
				>
					-
				</button>
			)}
			{onAddClick && (
				<button
					className={styles.addButton}
					onClick={handleAddClick}
					aria-label='Добавить в бургер'
				>
					+
				</button>
			)}
		</div>
	)
}

export default IngredientCard
