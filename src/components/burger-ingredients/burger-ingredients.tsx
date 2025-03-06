import React, { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
	const [currentTab, setCurrentTab] = useState('bun')

	const handleTabClick = (tab: string) => {
		setCurrentTab(tab)
		const element = document.getElementById(tab)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<section className={styles.ingredients}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

			{}
			<div className={styles.tabs}>
				<Tab
					value='bun'
					active={currentTab === 'bun'}
					onClick={() => handleTabClick('bun')}
				>
					Булки
				</Tab>
				<Tab
					value='sauce'
					active={currentTab === 'sauce'}
					onClick={() => handleTabClick('sauce')}
				>
					Соусы
				</Tab>
				<Tab
					value='main'
					active={currentTab === 'main'}
					onClick={() => handleTabClick('main')}
				>
					Начинки
				</Tab>
			</div>

			{/* Список ингредиентов */}
			<div className={styles.ingredientsList}>
				{/* Булки */}
				<h2 id='bun' className='text text_type_main-medium mt-10 mb-6'>
					Булки
				</h2>
				<div className={styles.ingredientsSection}>
					<IngredientCard
						name='Краторная булка N-200i'
						price={200}
						image='https://code.s3.yandex.net/react/code/bun-02.png'
					/>
					<IngredientCard
						name='Флюоресцентная булка R2-D3'
						price={300}
						image='https://code.s3.yandex.net/react/code/bun-01.png'
					/>
				</div>

				{/* Соусы */}
				<h2 id='sauce' className='text text_type_main-medium mt-10 mb-6'>
					Соусы
				</h2>
				<div className={styles.ingredientsSection}>
					<IngredientCard
						name='Соус Spicy-X'
						price={90}
						image='https://code.s3.yandex.net/react/code/sauce-02.png'
					/>
					<IngredientCard
						name='Соус фирменный Space Sauce'
						price={80}
						image='https://code.s3.yandex.net/react/code/sauce-04.png'
					/>
				</div>

				{/* Начинки */}
				<h2 id='main' className='text text_type_main-medium mt-10 mb-6'>
					Начинки
				</h2>
				<div className={styles.ingredientsSection}>
					<IngredientCard
						name='Мясо бессмертных моллюсков Protostomia'
						price={250}
						image='https://code.s3.yandex.net/react/code/meat-02.png'
					/>
					<IngredientCard
						name='Говяжий метеорит (отбивная)'
						price={300}
						image='https://code.s3.yandex.net/react/code/meat-04.png'
					/>
				</div>
			</div>
		</section>
	)
}

export default BurgerIngredients
