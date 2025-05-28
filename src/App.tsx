import React, { useState, useEffect } from 'react'
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
import FeedPage from './pages/feed/FeedPage'
import OrderDetailsPage from './pages/order-details/OrderDetailsPage'
import ProfileOrdersPage from './pages/profile/orders/ProfileOrdersPage'
import OrderDetailsModal from './components/order-details-modal/order-details-modal'
import styles from './App.module.css'
import { Ingredient } from './services/types'

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const { items: ingredients } = useAppSelector(state => state.ingredients)
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null)
	const [isModalOpened, setIsModalOpened] = useState(false)
	const background = location.state?.background

	const handleOpenIngredientModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient)
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		})
		setIsModalOpened(true)
	}

	const handleOpenOrderModal = (orderNumber: number, isProfile: boolean) => {
		navigate(
			isProfile ? `/profile/orders/${orderNumber}` : `/feed/${orderNumber}`,
			{
				state: { background: location },
			}
		)
	}

	const handleCloseModal = () => {
		navigate(-1)
		setIsModalOpened(false)
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

					<Route
						path='/profile/orders'
						element={
							<ProtectedRoute>
								<ProfileOrdersPage />
							</ProtectedRoute>
						}
					/>

					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

					<Route path='/feed' element={<FeedPage />} />
					<Route path='/feed/:number' element={<OrderDetailsPage />} />

					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<OrderDetailsPage />
							</ProtectedRoute>
						}
					/>

					<Route path='/404' element={<NotFoundPage />} />
					<Route path='*' element={<Navigate to='/404' replace />} />
				</Routes>

				{isModalOpened && selectedIngredient && (
					<Modal onClose={handleCloseModal} title='Детали ингредиента'>
						<IngredientDetails ingredient={selectedIngredient} />
					</Modal>
				)}

				{background && (
					<Routes>
						<Route
							path='/feed/:number'
							element={
								<Modal onClose={handleCloseModal} title=''>
									<OrderDetailsModal />
								</Modal>
							}
						/>
						<Route
							path='/profile/orders/:number'
							element={
								<Modal onClose={handleCloseModal} title=''>
									<OrderDetailsModal />
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
