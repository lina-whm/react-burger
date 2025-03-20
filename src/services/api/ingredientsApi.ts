import { API_BASE } from '../../components/utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Ingredient } from '../../components/utils/types'

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await fetch(`${API_BASE}/ingredients`)
		const data = await response.json()
		return data.data as Ingredient[] 
	}
)
