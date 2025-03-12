export interface Ingredient {
	_id: string
	name: string
	type: 'bun' | 'sauce' | 'main'
	price: number
	image: string
	calories?: number
	proteins?: number
	fat?: number
	carbohydrates?: number
}

export interface ConstructorIngredient extends Ingredient {
	uuid: string
}

export interface RootState {
	constructor: {
		bun: ConstructorIngredient | null
		ingredients: ConstructorIngredient[]
	}
}
