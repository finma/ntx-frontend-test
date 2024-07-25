import { useMutation } from "@apollo/client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CategoryType } from "@/types/category"
import { useModal } from "@/hooks/useModalStore"
import { useDataStore } from "@/hooks/useDataStore"
import { ADD_PRODUCT, GET_PRODUCTS } from "@/graphql/queries"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export const CreateProductModal = () => {
	const { isOpen, onClose, type } = useModal()
	const { categories } = useDataStore()

	const [addProduct] = useMutation(ADD_PRODUCT, {
		refetchQueries: [{ query: GET_PRODUCTS }],
	})

	const isModalOpen = isOpen && type === "create-product"

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const name = formData.get("product")
		const category_id = formData.get("category") as unknown as number
		const price = formData.get("price") as unknown as number
		const quantity = formData.get("quantity") as unknown as number

		await addProduct({
			variables: { name, category_id, price, quantity },
		})
		onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle className="text-center">Add New Product</DialogTitle>
					</DialogHeader>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="product">Product</Label>
						<Input
							id="product"
							name="product"
							type="text"
							placeholder="Enter product name"
							className="focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="category">Category</Label>
						<Select name="category">
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categories?.map((category: CategoryType) => (
										<SelectItem
											key={category.id}
											value={category.id.toString()}
										>
											{category.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="price">Price</Label>
						<Input
							id="price"
							name="price"
							type="number"
							placeholder="Enter price name"
							className="focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="quantity">Quantity</Label>
						<Input
							id="quantity"
							name="quantity"
							type="number"
							placeholder="Enter quantity name"
							className="focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
					</div>
					<DialogFooter className="mt-4">
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
