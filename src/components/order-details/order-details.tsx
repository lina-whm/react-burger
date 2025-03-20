import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

interface OrderDetailsProps {
	orderNumber: number;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
	return (
		<div className={styles.details}>
			<h2 className='text text_type_digits-large'>{orderNumber}</h2>
			<p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
			<div className={styles.checkmark}>
				<CheckMarkIcon type='primary' />
			</div>
			<p className='text text_type_main-default mt-15'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive mt-2'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
