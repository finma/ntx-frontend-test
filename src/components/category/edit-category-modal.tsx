import { useMutation } from "@apollo/client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModal } from "@/hooks/useModalStore"
import { Button } from "@/components/ui/button"
import { EDIT_CATEGORY, GET_CATEGORIES } from "@/graphql/queries"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export const EditCategoryModal = () => {
	const { isOpen, onClose, type, data } = useModal()

	const [editCategory] = useMutation(EDIT_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
	})

	const isModalOpen = isOpen && type === "edit-category"
	const { category } = data

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const name = formData.get("category")

		await editCategory({ variables: { id: category?.id, name } })
		onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle className="text-center">Edit Category</DialogTitle>
					</DialogHeader>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="category">Category</Label>
						<Input
							id="category"
							name="category"
							type="text"
							defaultValue={category?.name}
							placeholder="Enter category name"
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
