import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {
	Routes,
	Route,
	useLocation,
	Navigate,
	useNavigate,
	useParams,
} from 'react-router-dom'
import { useAppSelector } from './services/hooks'
import Modal from './components/modal/modal'
import IngredientDetails from './components/ingredient-details/ingredient-details'
import OrderDetails from './components/order-details/order-details'
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ForgotPasswordPage from './pages/forgot-password/ForgotPasswordPage'
import ResetPasswordPage from './pages/reset-password/ResetPasswordPage'
import ProfilePage from './pages/profile/ProfilePage'
import IngredientDetailsPage from './pages/ingredients/IngredientDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/protected-route/ProtectedRoute'
import UnauthRoute from './components/unauth-route/UnauthRoute'
import ResetPasswordRoute from './components/reset-password-route/ResetPasswordRoute'
import styles from './App.module.css'
import { Ingredient } from './components/utils/types'

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const { id } = useParams()
	const { items: ingredients } = useAppSelector(state => state.ingredients)
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)
	const [isModalOpened, setIsModalOpened] = useState(false)

	// определяем, открыто ли модальное окно
	const background = location.state?.background

	// восстанавливаем состояние при загрузке
	useEffect(() => {
		if (location.pathname.startsWith('/ingredients/')) {
			const ingredientId = id || location.pathname.split('/')[2]
			const ingredient = ingredients.find(item => item._id === ingredientId)

			if (ingredient) {
				setSelectedIngredient(ingredient)
				// если есть background - значит это модальное окно
				if (background) {
					setIsModalOpened(true)
				}
			}
		}
	}, [location, id, ingredients, background])

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		})
		setIsModalOpened(true)
	}

	const handleCloseModal = () => {
		navigate(-1)
		setIsModalOpened(false)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.App}>
				<AppHeader />

				{/* Основные маршруты */}
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
						element={
							<ResetPasswordRoute>
								<ResetPasswordPage />
							</ResetPasswordRoute>
						}
					/>

					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>

					{/* Отдельная страница ингредиента */}
					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

					<Route path='/404' element={<NotFoundPage />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>

				{/* Модальное окно для ингредиента */}
				{isModalOpened && selectedIngredient && (
					<Modal onClose={handleCloseModal} title='Детали ингредиента'>
						<IngredientDetails ingredient={selectedIngredient} />
					</Modal>
				)}
			</div>
		</DndProvider>
	)
}

export default App
