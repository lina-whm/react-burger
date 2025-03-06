import React from 'react'
import {
	ConstructorElement,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
	return (
		<section className={`${styles.constructor} pt-25`}>
			{/* Верхняя булка */}
			<ConstructorElement
				type='top'
				isLocked={true}
				text='Краторная булка N-200i (верх)'
				price={200}
				thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
			/>

			{/* Список ингредиентов */}
			<ul className={styles.ingredientsList}>
				<li className={styles.ingredientItem}>
					<ConstructorElement
						text='Соус традиционный галактический'
						price={30}
						thumbnail='https://code.s3.yandex.net/react/code/sauce-03.png'
					/>
				</li>
				<li className={styles.ingredientItem}>
					<ConstructorElement
						text='Мясо бессмертных моллюсков Protostomia'
						price={300}
						thumbnail='https://code.s3.yandex.net/react/code/meat-02.png'
					/>
				</li>
				<li className={styles.ingredientItem}>
					<ConstructorElement
						text='Плоды Фалленманского дерева'
						price={80}
						thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
					/>
				</li>
				<li className={styles.ingredientItem}>
					<ConstructorElement
						text='Хрустящие минеральные кольца'
						price={80}
						thumbnail='https://code.s3.yandex.net/react/code/mineral_rings.png'
					/>
				</li>
			</ul>

			{/* Нижняя булка */}
			<ConstructorElement
				type='bottom'
				isLocked={true}
				text='Краторная булка N-200i (низ)'
				price={200}
				thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
			/>

			{/* Общая стоимость и кнопка */}
			<div className={`${styles.total} mt-10`}>
				<div className={styles.price}>
					<span className='text text_type_digits-medium mr-2'>510</span>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor
