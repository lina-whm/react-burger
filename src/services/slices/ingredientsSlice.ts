import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { request } from '../../components/utils/api'
import { Ingredient } from '../../components/utils/types'

interface IngredientsState {
	items: Ingredient[]
	loading: boolean
	error: string | null
}

const mockIngredients: Ingredient[] = [
	{
		_id: '61c0c5a71d1f82001bdaaa6d',
		name: 'Флюоресцентная булка R2-D3',
		type: 'bun',
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/bun-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
		calories: 643,
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa6c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		calories: 420,
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa72',
		name: 'Соус Spicy-X',
		type: 'sauce',
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
		calories: 30,
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa74',
		name: 'Соус традиционный галактический',
		type: 'sauce',
		price: 15,
		image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
		calories: 99,
		proteins: 42,
		fat: 24,
		carbohydrates: 42,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa73',
		name: 'Соус фирменный Space Sauce',
		type: 'sauce',
		price: 80,
		image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
		calories: 14,
		proteins: 50,
		fat: 22,
		carbohydrates: 11,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa75',
		name: 'Соус с шипами Антарианского плоскоходца',
		type: 'sauce',
		price: 88,
		image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
		calories: 100,
		proteins: 101,
		fat: 99,
		carbohydrates: 100,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa6f',
		name: 'Мясо бессмертных моллюсков Protostomia',
		type: 'main',
		price: 1337,
		image: 'https://code.s3.yandex.net/react/code/meat-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
		calories: 420,
		proteins: 433,
		fat: 244,
		carbohydrates: 33,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa71',
		name: 'Биокотлета из марсианской Магнолии',
		type: 'main',
		price: 424,
		image: 'https://code.s3.yandex.net/react/code/meat-01.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
		calories: 4242,
		proteins: 420,
		fat: 142,
		carbohydrates: 242,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa70',
		name: 'Говяжий метеорит (отбивная)',
		type: 'main',
		price: 3000,
		image: 'https://code.s3.yandex.net/react/code/meat-04.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
		calories: 2674,
		proteins: 800,
		fat: 800,
		carbohydrates: 300,
	},
	{
		_id: '61c0c5a71d1f82001bdaaa6e',
		name: 'Филе Люминесцентного тетраодонтимформа',
		type: 'main',
		price: 988,
		image: 'https://code.s3.yandex.net/react/code/meat-03.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
		calories: 643,
		proteins: 44,
		fat: 26,
		carbohydrates: 85,
	},
]

const initialState: IngredientsState = {
	items: [],
	loading: false,
	error: null,
}

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (_, { rejectWithValue }) => {
		try {
			const response = await request<{ data: Ingredient[] }>('/ingredients')
			return response.data
		} catch (error) {
			console.log('API unavailable, using mock ingredients')
			return mockIngredients
		}
	}
)

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchIngredients.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.loading = false
				state.items = action.payload
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export default ingredientsSlice.reducer
