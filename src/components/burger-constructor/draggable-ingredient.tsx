import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorIngredient } from '../../components/utils/types'

interface DraggableIngredientProps {
	ingredient: ConstructorIngredient
	index: number
	moveCard: (dragIndex: number, hoverIndex: number) => void
	onRemove: () => void
}

const DraggableIngredient: React.FC<DraggableIngredientProps> = ({
	ingredient,
	index,
	moveCard,
	onRemove,
}) => {
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
		hover(item: { index: number }, monitor) {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = index

			if (dragIndex === hoverIndex) return

			moveCard(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	drag(drop(ref))

	return (
		<div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={onRemove}
			/>
		</div>
	)
}

export default DraggableIngredient
