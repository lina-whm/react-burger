import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import constructorSlice from './constructorSlice'
import {
	ConstructorIngredient,
	IngredientType,
} from '../../components/utils/types'

const initialState = {
	bun: null,
	ingredients: [],
}

describe('constructorSlice', () => {
	it('should return initial state', () => {
		expect(constructorSlice(undefined, { type: '' })).toEqual(initialState)
	})

	it('should handle addIngredient for bun', () => {
		const bun: ConstructorIngredient = {
			_id: '1',
			name: 'Булка',
			type: 'bun' as IngredientType,
			price: 100,
			image: 'image',
			uniqueId: uuidv4(),
		}
		const action = {
			type: 'constructor/addIngredient',
			payload: bun,
		}
		const result = constructorSlice(initialState, action)
		expect(result.bun).toEqual(bun)
	})

	it('should handle clearConstructor', () => {
		const state = {
			bun: {
				_id: '1',
				name: 'Булка',
				type: 'bun' as IngredientType,
				price: 100,
				image: 'image',
				uniqueId: uuidv4(),
			},
			ingredients: [
				{
					_id: '2',
					name: 'Начинка',
					type: 'main' as IngredientType,
					price: 50,
					image: 'image',
					uniqueId: uuidv4(),
				},
			],
		}
		const action = {
			type: 'constructor/clearConstructor',
		}
		const result = constructorSlice(state, action)
		expect(result).toEqual(initialState)
	})
})
