export interface Ingredient {
	_id: string
	name: string
	type: 'bun' | 'sauce' | 'main'
	proteins: number
	fat: number
	carbohydrates: number
	calories: number
	price: number
	image: string
	image_mobile?: string
	image_large?: string
	__v?: number
}

export interface ConstructorIngredient extends Ingredient {
	uniqueId: string
}

export interface Order {
	_id: string
	ingredients: string[]
	status: 'created' | 'pending' | 'done' | 'cancelled'
	name: string
	createdAt: string
	updatedAt: string
	number: number
}

export interface OrdersResponse {
	success: boolean
	orders: Order[]
	total: number
	totalToday: number
}

export interface IUser {
	email: string
	name: string
}

export interface AuthState {
	user: IUser | null
	isAuth: boolean
	isLoading: boolean
	error: string | null
	forgotPasswordRequest: boolean
	resetPasswordRequest: boolean
}

export interface ConstructorState {
	bun: ConstructorIngredient | null
	ingredients: ConstructorIngredient[]
}

export interface IngredientsState {
	items: Ingredient[]
	loading: boolean
	error: string | null
}

export interface OrderState {
	orderNumber: number | null
	loading: boolean
	error: string | null
}

export interface IngredientDetailsState {
	ingredient: Ingredient | null
}

export interface OrdersFeedState {
	orders: Order[]
	total: number
	totalToday: number
	wsConnected: boolean
	error?: string
	isLoading: boolean
}
