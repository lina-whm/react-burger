import React from 'react'
import styles from './ingredient-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface IngredientCardProps {
	name: string
	price: number
	image: string
	onClick: () => void 
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	name,
	price,
	image,
	onClick,
}) => {
	return (
		<div className={styles.card} onClick={onClick}>
			{' '}
			{}
			<img src={image} alt={name} className={styles.image} />
			<div className={styles.price}>
				<span className='text text_type_digits-default mr-2'>{price}</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default'>{name}</p>
		</div>
	)
}

export default IngredientCard
