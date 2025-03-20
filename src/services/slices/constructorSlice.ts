import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
	Ingredient,
	ConstructorIngredient,
} from '../../components/utils/types';

interface BurgerConstructorState {
	bun: ConstructorIngredient | null;
	ingredients: ConstructorIngredient[];
}

const initialState: BurgerConstructorState = {
	bun: null,
	ingredients: [],
};

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addBun: {
			reducer(state, action: PayloadAction<Ingredient>) {
				state.bun = {
					...action.payload,
					uuid: uuidv4(),
				};
			},
			prepare(ingredient: Ingredient) {
				return { payload: ingredient };
			},
		},
		addIngredient: {
			reducer(state, action: PayloadAction<Ingredient>) {
				const newItem: ConstructorIngredient = {
					...action.payload,
					uuid: uuidv4(),
				};
				state.ingredients.push(newItem);
			},
			prepare(ingredient: Ingredient) {
				return { payload: ingredient };
			},
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(
				(item) => item.uuid !== action.payload
			);
		},
		moveIngredient: (
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) => {
			const { dragIndex, hoverIndex } = action.payload;
			const newIngredients = [...state.ingredients];
			const [removed] = newIngredients.splice(dragIndex, 1);
			newIngredients.splice(hoverIndex, 0, removed);
			state.ingredients = newIngredients;
		},
		clearConstructor: (state) => {
			state.bun = null;
			state.ingredients = [];
		},
	},
});

export const {
	addBun,
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
