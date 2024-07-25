import { Edit, Trash } from "lucide-react"
import { useMutation, useQuery } from "@apollo/client"

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"
import { DELETE_PRODUCT, GET_PRODUCTS } from "@/graphql/queries"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { ProductType } from "@/types/category"
import { useDataStore } from "@/hooks/useDataStore"

export const Product = () => {
	const { onOpen } = useModal()
	const { data, loading, error } = useQuery(GET_PRODUCTS)
	const { categories } = useDataStore()

	const [deleteProduct] = useMutation(DELETE_PRODUCT, {
		refetchQueries: [{ query: GET_PRODUCTS }],
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	const handleDeleteProduct = async (id: number) => {
		await deleteProduct({ variables: { id } })
	}

	const updatedProducts = data.products.map((product: ProductType) => {
		const category = categories.find(
			(category) => category.id === product.category_id,
		)
		return {
			...product,
			category: category ? { id: category.id, name: category.name } : null,
		}
	})

	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					Products
				</h1>
				<Button onClick={() => onOpen("create-product")}>
					Add New Product
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>No</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{updatedProducts?.map((product: ProductType, idx: number) => (
						<TableRow key={product.id}>
							<TableCell className="font-medium">{idx + 1}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.category?.name ?? "-"}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell>{product.quantity}</TableCell>
							<TableCell className="flex items-center justify-end gap-x-4 text-right">
								<Edit
									onClick={() => onOpen("edit-product", { product })}
									className="size-4 cursor-pointer"
								/>
								<Trash
									onClick={() => handleDeleteProduct(product.id)}
									className="size-4 cursor-pointer"
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
