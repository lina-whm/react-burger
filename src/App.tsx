import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
	Routes,
	Route,
	useLocation,
	Navigate,
	useNavigate,
} from 'react-router-dom'
import { useAppSelector } from './services/hooks'
import Modal from './components/modal/modal'
import IngredientDetails from './components/ingredient-details/ingredient-details'
import OrderDetails from './components/order-details/order-details'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import {
	LoginPage,
	RegisterPage,
	ForgotPasswordPage,
	ResetPasswordPage,
	ProfilePage,
	IngredientDetailsPage,
	NotFoundPage,
} from './pages'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import UnauthRoute from './components/unauth-route/UnauthRoute'
import ResetPasswordRoute from './components/reset-password-route/ResetPasswordRoute'
import styles from './App.module.css'
import { Ingredient } from './components/utils/types'

function App() {
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)
	const location = useLocation()
	const navigate = useNavigate()
	const background = location.state?.background

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		})
	}

	const handleCloseModal = () => {
		navigate(-1)
		setSelectedIngredient(null)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />
				<Routes location={background || location}>
					<Route
						path='/'
						element={
							<main className={styles.main}>
								<BurgerIngredients
									onIngredientClick={handleOpenIngredientModal}
								/>
								<BurgerConstructor />
							</main>
						}
					/>
					<Route
						path='/login'
						element={
							<UnauthRoute>
								<LoginPage />
							</UnauthRoute>
						}
					/>
					<Route
						path='/register'
						element={
							<UnauthRoute>
								<RegisterPage />
							</UnauthRoute>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<UnauthRoute>
								<ForgotPasswordPage />
							</UnauthRoute>
						}
					/>
					<Route
						path='/reset-password'
						element={<ResetPasswordRoute children={<ResetPasswordPage />} />}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
					<Route path='/404' element={<NotFoundPage />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>

				{background && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal onClose={handleCloseModal} title='Детали ингредиента'>
									{selectedIngredient && (
										<IngredientDetails ingredient={selectedIngredient} />
									)}
								</Modal>
							}
						/>
					</Routes>
				)}
			</div>
		</DndProvider>
	)
}

export default App
