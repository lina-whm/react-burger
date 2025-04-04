import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch } from '../../services/hooks'
import { removeIngredient } from '../../services/slices/constructorSlice'
import styles from './draggable-ingredient.module.css'
import { ConstructorIngredient } from '../../components/utils/types'

interface DraggableIngredientProps {
	ingredient: ConstructorIngredient
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
	moveCard,
}) => {
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLDivElement>(null)

	const [{ isDragging }, drag] = useDrag({
		type: 'ingredient',
		item: () => ({ id: ingredient.uniqueId, index }),
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: 'ingredient',
		hover(item: { id: string; index: number }, monitor) {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = index

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) return

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			// Get pixels to the top
			const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

			// Time to actually perform the action
			moveCard(dragIndex, hoverIndex)

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
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
