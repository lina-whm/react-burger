import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientCard from './ingredient-card/ingredient-card'
import styles from './burger-ingredients.module.css'
import { RootState } from '../../services/store/store'
import { Ingredient } from '../../components/utils/types'
import { useAppDispatch } from '../../services/hooks/useAppDispatch'
import { fetchIngredients } from '../../services/slices/ingredientsSlice'

interface BurgerIngredientsProps {
	onIngredientClick: (ingredient: Ingredient) => void
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
	onIngredientClick,
}) => {
	const dispatch = useAppDispatch()
	const { items, loading, error } = useSelector(
		(state: RootState) => state.ingredients
	)
	const [currentTab, setCurrentTab] = useState<'bun' | 'sauce' | 'main'>('bun')

	const bunRef = useRef<HTMLDivElement>(null)
	const sauceRef = useRef<HTMLDivElement>(null)
	const mainRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		dispatch(fetchIngredients())
	}, [dispatch])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						switch (entry.target.id) {
							case 'buns':
								setCurrentTab('bun')
								break
							case 'sauces':
								setCurrentTab('sauce')
								break
							case 'mains':
								setCurrentTab('main')
								break
							default:
								break
						}
					}
				})
			},
			{ threshold: 0.5 }
		)

		if (bunRef.current) observer.observe(bunRef.current)
		if (sauceRef.current) observer.observe(sauceRef.current)
		if (mainRef.current) observer.observe(mainRef.current)

		return () => observer.disconnect()
	}, [])

	const handleTabClick = (tab: 'bun' | 'sauce' | 'main') => {
		setCurrentTab(tab)
		const section = document.getElementById(
			tab === 'bun' ? 'buns' : tab === 'sauce' ? 'sauces' : 'mains'
		)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const buns = items.filter(item => item.type === 'bun')
	const sauces = items.filter(item => item.type === 'sauce')
	const mains = items.filter(item => item.type === 'main')

	if (loading)
		return (
			<p className='text text_type_main-default'>Загрузка ингредиентов...</p>
		)
	if (error)
		return <p className='text text_type_main-default'>Ошибка: {error}</p>
	if (items.length === 0)
		return (
			<p className='text text_type_main-default'>Нет доступных ингредиентов</p>
		)

	return (
		<section className={styles.ingredients}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

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

			<div className={styles.scrollContainer}>
				<div className={styles.category} id='buns' ref={bunRef}>
					<h2 className='text text_type_main-medium mb-6'>Булки</h2>
					<div className={styles.items}>
						{buns.map(ingredient => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onIngredientClick={onIngredientClick}
							/>
						))}
					</div>
				</div>

				<div className={styles.category} id='sauces' ref={sauceRef}>
					<h2 className='text text_type_main-medium mb-6'>Соусы</h2>
					<div className={styles.items}>
						{sauces.map(ingredient => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onIngredientClick={onIngredientClick}
							/>
						))}
					</div>
				</div>

				<div className={styles.category} id='mains' ref={mainRef}>
					<h2 className='text text_type_main-medium mb-6'>Начинки</h2>
					<div className={styles.items}>
						{mains.map(ingredient => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onIngredientClick={onIngredientClick}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default BurgerIngredients
