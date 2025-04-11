import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import styles from './ingredient-details.module.css'
import { fetchIngredients } from '../../services/slices/ingredientsSlice'

const IngredientDetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { items: ingredients, loading } = useAppSelector(
		state => state.ingredients
	)
	const ingredient = ingredients.find(item => item._id === id)

	useEffect(() => {
		if (ingredients.length === 0) {
			dispatch(fetchIngredients())
		}
	}, [dispatch, ingredients.length])

	useEffect(() => {
		if (!loading && ingredients.length > 0 && !ingredient) {
			navigate('/404', { replace: true })
		}
	}, [ingredient, loading, ingredients.length, navigate])

	if (loading || !ingredient) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					fontSize: '24px',
				}}
			>
				Загрузка...
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<h1 className='text text_type_main-large mt-10 mb-5'>
				Детали ингредиента
			</h1>
			<IngredientDetails ingredient={ingredient} />
		</div>
	)
}

export default IngredientDetailsPage
