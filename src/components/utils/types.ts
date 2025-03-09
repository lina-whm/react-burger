export interface Ingredient {
	_id: string
	name: string
	type: string
	price: number
	image: string
	image_mobile: string
	image_large: string
	calories: number
	proteins: number
	fat: number
	carbohydrates: number
	__v: number
}

export interface RootState {
	constructor: {
		bun: Ingredient | null
		ingredients: Ingredient[]
	}
	order: {
		orderNumber: number | null
		status: 'idle' | 'loading' | 'succeeded' | 'failed'
		error: string | null
	}
}
