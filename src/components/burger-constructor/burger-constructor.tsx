import React, { useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { selectBunAndIngredients } from '../../services/selectors/constructorSelectors'
import {
	addIngredient,
	removeIngredient,
	moveIngredient,
} from '../../services/slices/constructorSlice'
import DraggableIngredient from './draggable-ingredient'
import styles from './burger-constructor.module.css'
import { ConstructorIngredient } from '../../components/utils/types'

interface BurgerConstructorProps {
	onOrderClick: () => void
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
	onOrderClick,
}) => {
	const dispatch = useDispatch()
	const { bun, ingredients = [] } = useSelector(selectBunAndIngredients)
	const dropRef = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop({
		accept: 'ingredient',
		drop(item: ConstructorIngredient) {
			dispatch(addIngredient(item))
		},
	})

	drop(dropRef)

	const total = useMemo(() => {
		const ingredientsSum = ingredients.reduce(
			(sum, item) => sum + item.price,
			0
		)
		const bunSum = bun ? bun.price * 2 : 0
		return ingredientsSum + bunSum
	}, [bun, ingredients])

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(moveIngredient({ dragIndex, hoverIndex }))
		},
		[dispatch]
	)

	return (
		<div ref={dropRef} className={`${styles.constructor} pt-25 pl-4`}>
			{bun && (
				<div className='ml-8 mb-4'>
					<ConstructorElement
						type='top'
						isLocked
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			<div className={`${styles.scroll} custom-scroll`}>
				{ingredients.map((ingredient, index) => (
					<DraggableIngredient
						key={ingredient.uuid}
						ingredient={ingredient}
						index={index}
						moveCard={moveCard}
						onRemove={() => dispatch(removeIngredient(ingredient.uuid))}
					/>
				))}
			</div>

			{bun && (
				<div className='ml-8 mt-4'>
					<ConstructorElement
						type='bottom'
						isLocked
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			)}

			<div className={`${styles.total} mt-10`}>
				<span className='text text_type_digits-medium mr-2'>{total}</span>
				<CurrencyIcon type='primary' />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={onOrderClick}
					disabled={!bun || ingredients.length === 0}
				>
					Оформить заказ
				</Button>
			</div>
		</div>
	)
}

export default BurgerConstructor
