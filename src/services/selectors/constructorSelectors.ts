import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store/store';

export const selectConstructor = (state: RootState) => state.burgerConstructor;

export const selectBunAndIngredients = createSelector(
	[selectConstructor],
	constructor => ({
		bun: constructor.bun,
		ingredients: constructor.ingredients || [], 
	})
)
