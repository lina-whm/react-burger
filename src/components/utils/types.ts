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

export interface Order {
	number: number
	ingredients: string[]
	status: 'created' | 'pending' | 'done'
	createdAt: string
	updatedAt: string
}

export interface IUser {
	email: string
	name: string
}
