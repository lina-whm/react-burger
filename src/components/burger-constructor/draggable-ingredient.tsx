import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch } from '../../services/hooks'
import {
	moveIngredient,
	removeIngredient,
} from '../../services/slices/constructorSlice'
import styles from './draggable-ingredient.module.css'
import { ConstructorIngredient } from '../../components/utils/types'

interface DraggableIngredientProps {
	ingredient: ConstructorIngredient
	index: number
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
}) => {
	const dispatch = useAppDispatch()
	const ref = React.useRef<HTMLDivElement>(null)

	const [{ isDragging }, drag] = useDrag({
		type: 'ingredient',
		item: { index },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: 'ingredient',
		hover: (item: { index: number }, monitor) => {
			if (!ref.current) return
			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) return

			dispatch(moveIngredient({ dragIndex, hoverIndex }))
			item.index = hoverIndex
		},
	})

	drag(drop(ref))

	return (
		<div
			ref={ref}
			className={styles.draggableItem}
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<DragIcon type='primary' />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => dispatch(removeIngredient(ingredient.uniqueId))}
			/>
		</div>
	)
}

export default DraggableIngredient
