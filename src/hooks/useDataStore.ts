import { create } from "zustand"

import { CategoryType, ProductType } from "@/types/category"

interface DataStore {
	categories: CategoryType[]
	products: ProductType[]
	setCategories: (categories: CategoryType[]) => void
	setProducts: (products: ProductType[]) => void
}

export const useDataStore = create<DataStore>((set) => ({
	categories: [],
	products: [],
	setCategories: (categories) => set({ categories }),
	setProducts: (products) => set({ products }),
}))
