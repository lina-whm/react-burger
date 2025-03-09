import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { fetchIngredients } from '../../services/slices/ingredientsSlice'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './burger-ingredients.module.css'
import classNames from 'classnames'
import { RootState } from '../../services/store/store'
import { useAppDispatch } from '../../services/hooks/useAppDispatch'
import { Ingredient } from '@utils/types' 

const BurgerIngredients = () => {
	const dispatch = useAppDispatch()

	
	const { items, status, error } = useSelector(
		(state: RootState) => state.ingredients
	)

	
	useEffect(() => {
		dispatch(fetchIngredients())
	}, [dispatch])

	
	const [currentTab, setCurrentTab] = React.useState('bun')
	const handleTabClick = (tab: string) => {
		setCurrentTab(tab)
		const element = document.getElementById(tab)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	
	const handleIngredientClick = (ingredient: Ingredient) => {
		console.log('Выбран ингредиент:', ingredient)
	}

	
	const buns = items.filter(
		(ingredient: Ingredient) => ingredient.type === 'bun'
	)
	const sauces = items.filter(
		(ingredient: Ingredient) => ingredient.type === 'sauce'
	)
	const mains = items.filter(
		(ingredient: Ingredient) => ingredient.type === 'main'
	)

	
	if (status === 'loading')
		return (
			<p className={classNames('text', 'text_type_main-default')}>
				Загрузка...
			</p>
		)

	
	if (status === 'failed')
		return (
			<p className={classNames('text', 'text_type_main-default')}>
				Ошибка: {error}
			</p>
		)

	return (
		<section className={styles.ingredients}>
			<h1
				className={classNames('text', 'text_type_main-large', 'mt-10', 'mb-5')}
			>
				Соберите бургер
			</h1>

			{/* Переключатели категорий */}
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
				<h2
					id='bun'
					className={classNames(
						'text',
						'text_type_main-medium',
						'mt-10',
						'mb-6'
					)}
				>
					Булки
				</h2>
				<div className={styles.ingredientsSection}>
					{buns.map((bun: Ingredient) => (
						<IngredientCard
							key={bun._id}
							name={bun.name}
							price={bun.price}
							image={bun.image}
							onClick={() => handleIngredientClick(bun)}
						/>
					))}
				</div>

				{/* Соусы */}
				<h2
					id='sauce'
					className={classNames(
						'text',
						'text_type_main-medium',
						'mt-10',
						'mb-6'
					)}
				>
					Соусы
				</h2>
				<div className={styles.ingredientsSection}>
					{sauces.map((sauce: Ingredient) => (
						<IngredientCard
							key={sauce._id}
							name={sauce.name}
							price={sauce.price}
							image={sauce.image}
							onClick={() => handleIngredientClick(sauce)}
						/>
					))}
				</div>

				{/* Начинки */}
				<h2
					id='main'
					className={classNames(
						'text',
						'text_type_main-medium',
						'mt-10',
						'mb-6'
					)}
				>
					Начинки
				</h2>
				<div className={styles.ingredientsSection}>
					{mains.map((main: Ingredient) => (
						<IngredientCard
							key={main._id}
							name={main.name}
							price={main.price}
							image={main.image}
							onClick={() => handleIngredientClick(main)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default BurgerIngredients
