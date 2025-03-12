import React from 'react'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'
import styles from './order-details.module.css'

const OrderDetails = () => {
	return (
		<div className={classNames(styles.details)}>
			<h2
				className={classNames(
					'text',
					'text_type_digits-large',
					styles.orderNumber
				)}
			>
				034536
			</h2>
			<p
				className={classNames('text', 'text_type_main-medium', styles.orderId)}
			>
				идентификатор заказа
			</p>
			<div className={classNames(styles.checkmark)}>
				<CheckMarkIcon type='primary' />
			</div>
			<p
				className={classNames('text', 'text_type_main-default', styles.status)}
			>
				Ваш заказ начали готовить
			</p>
			<p
				className={classNames(
					'text',
					'text_type_main-default',
					'text_color_inactive',
					styles.waiting
				)}
			>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	)
}

export default OrderDetails
