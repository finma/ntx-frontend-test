import { useMutation } from "@apollo/client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModal } from "@/hooks/useModalStore"
import { Button } from "@/components/ui/button"
import { ADD_CATEGORY, GET_CATEGORIES } from "@/graphql/queries"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"

export const CreateCategoryModal = () => {
	const { isOpen, onClose, type } = useModal()

	const [addCategory] = useMutation(ADD_CATEGORY, {
		refetchQueries: [{ query: GET_CATEGORIES }],
	})

	const isModalOpen = isOpen && type === "create-category"

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const name = formData.get("category")

		await addCategory({ variables: { name } })
		onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle className="text-center">Add New Category</DialogTitle>
					</DialogHeader>
					<div className="mt-4 grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="category">Category</Label>
						<Input
							id="category"
							name="category"
							type="text"
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
