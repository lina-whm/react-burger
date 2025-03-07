import React, { useEffect, useState } from 'react'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './App.module.css'
import { API_BASE } from './components/utils/api'


interface Ingredient {
	_id: string
	name: string
	type: string
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile: string
	image_large: string
	__v: number
}

const App = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetch(`${API_BASE}/ingredients`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка при загрузке данных')
				}
				return response.json()
			})
			.then(data => {
				setIngredients(data.data)
				setError(null)
			})
			.catch(error => {
				console.error('Ошибка:', error)
				setError(error.message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading)
		return <p className='text text_type_main-default'>Загрузка...</p>
	if (error)
		return <p className='text text_type_main-default'>Ошибка: {error}</p>

	return (
		<div className='App'>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor selectedIngredients={ingredients} />
			</main>
		</div>
	)
}

export default App
