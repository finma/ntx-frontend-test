export type CategoryType = {
	id: number
	name: string
	parent_id?: number
}

export type ProductType = {
	category_id: number
	created_at: string
	id: number
	name: string
	price: number
	quantity: number
	category?: CategoryType
}
