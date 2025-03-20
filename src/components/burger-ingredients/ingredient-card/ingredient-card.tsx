import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../../services/hooks';
import { RootState } from '../../../services/store/store';
import styles from './ingredient-card.module.css';
import {
	Ingredient,
	ConstructorIngredient,
	IngredientType,
} from './../../utils/types';
import { v4 as uuidv4 } from 'uuid';

interface IngredientCardProps {
	ingredient: Ingredient;
	onIngredientClick: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onIngredientClick,
}) => {
	const { ingredients = [], bun } = useAppSelector(
		(state: RootState) => state.burgerConstructor
	);
const [{ isDragging }, drag] = useDrag({
	type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
	item: () => {
	
		if (
			!ingredient._id ||
			!ingredient.type ||
			!ingredient.name ||
			!ingredient.price ||
			!ingredient.image
		) {
			console.error('Invalid ingredient:', ingredient);
			return {};
		}
		return {
			...ingredient,
			uuid: uuidv4(),
		} as ConstructorIngredient;
	},
	collect: (monitor) => ({
		isDragging: monitor.isDragging(),
	}),
});

	const count = React.useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0;
		}
		return ingredients.filter(
			(item: ConstructorIngredient) => item._id === ingredient._id
		).length;
	}, [ingredient, bun, ingredients]);

	return (
		<div
			className={styles.card}
			onClick={onIngredientClick}
			ref={drag}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			{count > 0 && <div className={styles.count}>{count}</div>}
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={styles.image}
			/>
			<div className={styles.price}>
				<span className='text text_type_digits-default'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>
		</div>
	);
};

IngredientCard.propTypes = {
	ingredient: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['bun', 'sauce', 'main'] as IngredientType[])
			.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
	onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientCard;
