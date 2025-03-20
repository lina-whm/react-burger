import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import {
	addBun,
	addIngredient,
	clearConstructor,
} from '../../services/slices/constructorSlice';
import DraggableIngredient from './draggable-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import { Ingredient, ConstructorIngredient } from '../utils/types';
import { RootState } from '../../services/store/store';
import classNames from 'classnames';

interface BurgerConstructorProps {
	onOrderClick: () => void;
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
	onOrderClick,
}) => {
	const dispatch = useAppDispatch();
	const { bun, ingredients = [] } = useAppSelector(
		(state: RootState) => state.burgerConstructor
	);
	const {
		orderNumber,
		loading: orderLoading,
		error: orderError,
	} = useAppSelector((state: RootState) => state.order);
	const dndRef = useRef<HTMLDivElement>(null);

	const [{ isHoverBun }, dropBun] = useDrop({
		accept: 'bun',
		drop: (item: Ingredient) => {
			dispatch(addBun(item));
		},
		collect: (monitor) => ({
			isHoverBun: monitor.isOver(),
		}),
	});

	const [{ isHoverIngredient }, dropIngredient] = useDrop({
		accept: 'ingredient',
		drop: (item: Ingredient) => {
			if (item?._id && item?.type) {
				dispatch(addIngredient(item));
			} else {
				console.error('Invalid drop item:', item);
			}
		},
		collect: (monitor) => ({
			isHoverIngredient: monitor.isOver(),
		}),
	});

	const totalPrice = React.useMemo(() => {
		const ingredientsSum = ingredients.reduce(
			(sum: number, item: ConstructorIngredient) => sum + item.price,
			0
		);
		const bunSum = bun ? bun.price * 2 : 0;
		return ingredientsSum + bunSum;
	}, [bun, ingredients]);

	const isOrderButtonDisabled = !bun || ingredients.length === 0;

	const handleOrderClick = async () => {
		if (!bun || ingredients.length === 0) return;

		const ingredientIds = [
			bun._id,
			...ingredients.map((item: ConstructorIngredient) => item._id),
			bun._id,
		];

		onOrderClick();
	};

	return (
		<div className={classNames(styles.constructor)} ref={dndRef}>
			<div
				className={classNames(styles.bunSection, styles.topBun, {
					[styles.hover]: isHoverBun,
				})}
				ref={dropBun}>
				{bun ? (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div className={classNames(styles.placeholder)}>
						Перетащите булку (верх)
					</div>
				)}
			</div>

			<div
				className={classNames(styles.ingredientsList, {
					[styles.hover]: isHoverIngredient,
					[styles.withScroll]: ingredients.length > 2, 
				})}
				ref={dropIngredient}>
				{ingredients.length > 0 ? (
					ingredients.map((item: ConstructorIngredient, index: number) => (
						<DraggableIngredient
							key={item.uuid}
							ingredient={item}
							index={index}
						/>
					))
				) : (
					<div className={classNames(styles.placeholder)}>
						Перетащите начинку или соус
					</div>
				)}
			</div>

			<div
				className={classNames(styles.bunSection, styles.bottomBun, {
					[styles.hover]: isHoverBun,
				})}
				ref={dropBun}>
				{bun ? (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				) : (
					<div className={classNames(styles.placeholder)}>
						Перетащите булку (низ)
					</div>
				)}
			</div>

			<div className={classNames(styles.total)}>
				<p className={classNames(styles.totalPrice)}>
					<span className='text text_type_digits-medium'>{totalPrice}</span>
					<CurrencyIcon type='primary' />
				</p>
				<Button
					type='primary'
					size='large'
					htmlType='button'
					onClick={handleOrderClick}
					disabled={isOrderButtonDisabled || orderLoading}>
					{orderLoading ? 'Оформление...' : 'Оформить заказ'}
				</Button>
			</div>

			{orderError && (
				<div className={classNames(styles.error)}>
					<p className='text text_type_main-default text_color_error'>
						{orderError}
					</p>
				</div>
			)}

			{orderNumber && (
				<Modal onClose={() => dispatch(clearConstructor())}>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</div>
	);
};

export default BurgerConstructor;
