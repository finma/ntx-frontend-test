import { gql } from "@apollo/client"

// Get all categories
export const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			id
			name
			parent_id
			categories {
				id
				name
			}
		}
	}
`

// Add a new category
export const ADD_CATEGORY = gql`
	mutation AddCategory($name: String!) {
		insert_categories_one(object: { name: $name }) {
			id
			name
		}
	}
`

// Edit a category
export const EDIT_CATEGORY = gql`
	mutation EditCategory($id: Int!, $name: String!) {
		update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
			id
			name
		}
	}
`

// Delete a category
export const DELETE_CATEGORY = gql`
	mutation DeleteCategory($id: Int!) {
		delete_categories_by_pk(id: $id) {
			id
		}
	}
`

// Get all categories
export const GET_PRODUCTS = gql`
	query GetProducts {
		products {
			id
			name
			category_id
			price
			quantity
			company {
				id
				name
				location {
					id
				}
			}
			created_at
		}
	}
`

// Get all categories
export const ADD_PRODUCT = gql`
	mutation AddProduct(
		$name: String!
		$price: numeric
		$quantity: Int
		$category_id: Int
	) {
		insert_products_one(
			object: {
				name: $name
				price: $price
				quantity: $quantity
				category_id: $category_id
			}
		) {
			id
			name
			price
		}
	}
`

// Get all categories
export const EDIT_PRODUCT = gql`
	mutation EditProduct(
		$id: Int!
		$name: String!
		$price: numeric
		$quantity: Int
		$category_id: Int
	) {
		update_products_by_pk(
			pk_columns: { id: $id }
			_set: {
				name: $name
				price: $price
				quantity: $quantity
				category_id: $category_id
			}
		) {
			id
			name
			price
			category_id
		}
	}
`

// Delete a product
export const DELETE_PRODUCT = gql`
	mutation DeleteProduct($id: Int!) {
		delete_products_by_pk(id: $id) {
			id
		}
	}
`
