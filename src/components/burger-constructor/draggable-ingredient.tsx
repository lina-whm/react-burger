import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { Ingredient } from '../../components/utils/types'

interface DraggableIngredientProps {
	ingredient: Ingredient
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
	moveCard,
}) => {
	const ref = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop({
		accept: 'INGREDIENT',
		hover: (item: { index: number }, monitor) => {
			if (!ref.current) return
			const dragIndex = item.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) return
			moveCard(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	const [{ isDragging }, drag] = useDrag({
		type: 'INGREDIENT',
		item: { index },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	drag(drop(ref))

	return (
		<div
			ref={ref}
			style={{ opacity: isDragging ? 0.5 : 1 }}
			className={styles.ingredientItem}
		>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
			/>
		</div>
	)
}

export default DraggableIngredient
