export type IngredientType = 'bun' | 'sauce' | 'main';

export interface Ingredient {
	_id: string;
	name: string;
	type: IngredientType;
	price: number;
	image: string;
	calories?: number;
	proteins?: number;
	fat?: number;
	carbohydrates?: number;
}

export interface ConstructorIngredient extends Ingredient {
	uuid: string;
}
