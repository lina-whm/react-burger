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
	uuid: string // Уникальный идентификатор для ингредиента в конструкторе
}

export interface RootState {
	ingredients: {
		items: Ingredient[]
		loading: boolean
		error: string | null
	}
	constructor: {
		bun: ConstructorIngredient | null // Используем ConstructorIngredient
		ingredients: ConstructorIngredient[] // Используем ConstructorIngredient
	}
	order: {
		orderNumber: number | null
		loading: boolean
		error: string | null
	}
	ingredientDetails: {
		ingredient: Ingredient | null
	}
}
