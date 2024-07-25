import { create } from "zustand"

import { CategoryType, ProductType } from "@/types/category"

export type ModalType =
	| "create-category"
	| "edit-category"
	| "create-product"
	| "edit-product"

interface ModalData {
	category?: CategoryType
	categories?: CategoryType[]
	product?: ProductType
}

interface ModalStore {
	type: ModalType | null
	data: ModalData
	isOpen: boolean
	onOpen: (type: ModalType, data?: ModalData) => void
	onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ isOpen: false, type: null }),
}))
