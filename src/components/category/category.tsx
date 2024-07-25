import { Edit, Trash } from "lucide-react"
import { useMutation, useQuery } from "@apollo/client"

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"
import { DELETE_CATEGORY, GET_CATEGORIES } from "@/graphql/queries"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { CategoryType } from "@/types/category"
import { useDataStore } from "@/hooks/useDataStore"
import { useEffect } from "react"

export const Category = () => {
	const { onOpen } = useModal()
	const { data, loading, error } = useQuery(GET_CATEGORIES)
	const { setCategories } = useDataStore()

	const [deleteCategory] = useMutation(DELETE_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
	})

	useEffect(() => {
		if (data && data.categories) {
			console.log({ data })
			setCategories(data.categories)
		}
	}, [data, setCategories])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error</div>

	const handleDeleteCategory = async (id: number) => {
		await deleteCategory({ variables: { id } })
	}

	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					Categories
				</h1>
				<Button onClick={() => onOpen("create-category")}>
					Add New Category
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>No</TableHead>
						<TableHead>Name</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.categories?.map((category: CategoryType, idx: number) => (
						<TableRow>
							<TableCell className="font-medium">{idx + 1}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell className="flex items-center justify-end gap-x-4 text-right">
								<Edit
									onClick={() => onOpen("edit-category", { category })}
									className="size-4 cursor-pointer"
								/>
								<Trash
									onClick={() => handleDeleteCategory(category.id)}
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
