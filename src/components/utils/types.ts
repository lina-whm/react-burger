export type IngredientType = 'bun' | 'sauce' | 'main'

export interface Ingredient {
	_id: string
	name: string
	type: IngredientType
	price: number
	image: string
	image_mobile?: string
	image_large?: string
	calories: number
	proteins: number
	fat: number
	carbohydrates: number
	__v?: number
}

export interface ConstructorIngredient extends Ingredient {
	uniqueId: string
}
