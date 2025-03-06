import React from 'react'
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css'

interface IIngredientCardProps {
	name: string
	price: number
	image: string
}

const IngredientCard: React.FC<IIngredientCardProps> = ({
	name,
	price,
	image,
}) => {
	return (
		<div className={styles.card}>
			<img src={image} alt={name} className={styles.image} />
			<div className={styles.price}>
				<span className='text text_type_digits-default mr-2'>{price}</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default'>{name}</p>
			<Counter count={1} size='default' />
		</div>
	)
}

export default IngredientCard
