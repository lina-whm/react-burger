import constructorSlice, {
	addIngredient,
	removeIngredient,
	moveIngredient,
	clearConstructor,
} from './constructorSlice'
import { ConstructorIngredient, IngredientType } from '../../components/utils/types'

jest.mock('uuid', () => ({
	v4: jest.fn(() => 'mocked-unique-id'),
}))

const initialState = constructorSlice(undefined, { type: '' })

const mockBun: ConstructorIngredient = {
	_id: '1',
	name: 'Булка',
	type: 'bun' as IngredientType,
	price: 100,
	image: 'image',
	calories: 300,
	proteins: 10,
	fat: 5,
	carbohydrates: 50,
	uniqueId: 'mocked-unique-id',
}

const mockIngredient: ConstructorIngredient = {
	_id: '2',
	name: 'Котлета',
	type: 'main' as IngredientType,
	price: 50,
	image: 'image',
	calories: 200,
	proteins: 5,
	fat: 3,
	carbohydrates: 30,
	uniqueId: 'mocked-unique-id',
}

describe('constructorSlice', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return initial state', () => {
		expect(constructorSlice(undefined, { type: '' })).toEqual(initialState)
	})

	it('should add bun to constructor', () => {
		const action = {
			type: addIngredient.type,
			payload: {
				...mockBun,
				uniqueId: 'mocked-unique-id',
			},
		}
		const state = constructorSlice(initialState, action)
		expect(state.bun).toEqual({
			...mockBun,
			uniqueId: 'mocked-unique-id',
		})
	})

	it('should add ingredient to constructor', () => {
		const action = {
			type: addIngredient.type,
			payload: {
				...mockIngredient,
				uniqueId: 'mocked-unique-id',
			},
		}
		const state = constructorSlice(initialState, action)
		expect(state.ingredients).toEqual([
			{
				...mockIngredient,
				uniqueId: 'mocked-unique-id',
			},
		])
	})

	it('should remove ingredient', () => {
		const stateWithIngredient = {
			...initialState,
			ingredients: [{ ...mockIngredient, uniqueId: 'test-id' }],
		}
		const state = constructorSlice(
			stateWithIngredient as unknown as Parameters<typeof constructorSlice>[0],
			removeIngredient('test-id')
		)
		expect(state.ingredients).toEqual([])
	})

	it('should move ingredient', () => {
		const secondIngredient = { ...mockIngredient, uniqueId: 'second-id' }
		const stateWithIngredients = {
			...initialState,
			ingredients: [
				{ ...mockIngredient, uniqueId: 'first-id' },
				secondIngredient,
			],
		}
		const state = constructorSlice(
			stateWithIngredients as unknown as Parameters<typeof constructorSlice>[0],
			moveIngredient({ dragIndex: 0, hoverIndex: 1 })
		)
		expect(state.ingredients[0]).toEqual(secondIngredient)
		expect(state.ingredients[1]).toEqual({
			...mockIngredient,
			uniqueId: 'first-id',
		})
	})

	it('should clear constructor', () => {
		const stateWithItems = {
			bun: { ...mockBun, uniqueId: 'test-id' },
			ingredients: [{ ...mockIngredient, uniqueId: 'test-id' }],
		}
		const state = constructorSlice(
			stateWithItems as unknown as Parameters<typeof constructorSlice>[0],
			clearConstructor()
		)
		expect(state).toEqual(initialState)
	})
})