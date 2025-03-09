import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import styles from './App.module.css'

const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />
				<main className={styles.main}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</div>
		</DndProvider>
	)
}

export default App
