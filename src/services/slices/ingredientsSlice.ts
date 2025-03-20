import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE } from '../../components/utils/api';
import { Ingredient } from '../../components/utils/types';

interface IngredientsState {
	items: Ingredient[];
	loading: boolean;
	error: string | null;
}

const initialState: IngredientsState = {
	items: [],
	loading: false,
	error: null,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async () => {
		const response = await fetch(`${API_BASE}/ingredients`);
		const data = await response.json();
		return data.data;
	}
);

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchIngredients.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.map((item: any) => ({
					_id: item._id,
					name: item.name,
					type: item.type,
					price: item.price,
					image: item.image,
					calories: item.calories || 0,
					proteins: item.proteins || 0,
					fat: item.fat || 0,
					carbohydrates: item.carbohydrates || 0,
				}));
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Ошибка загрузки';
			});
	},
});

export default ingredientsSlice.reducer;
