import { useRoutes } from "react-router-dom"

import { SiteHeader } from "@/components/site-header"
import { Product } from "@/components/product/product"
import { Category } from "@/components/category/category"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { EditCategoryModal } from "@/components/category/edit-category-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateCategoryModal } from "@/components/category/create-category-modal"
import { CreateProductModal } from "./components/product/create-product-modal"
import { EditProductModal } from "./components/product/edit-product-modal"

const routes = [{ path: "/", element: <Home /> }]

function Home() {
	return (
		<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			<CreateCategoryModal />
			<EditCategoryModal />
			<CreateProductModal />
			<EditProductModal />

			<Tabs defaultValue="categories">
				<TabsList>
					<TabsTrigger value="categories">Categories</TabsTrigger>
					<TabsTrigger value="products">Products</TabsTrigger>
				</TabsList>
				<TabsContent value="categories">
					<Category />
				</TabsContent>
				<TabsContent value="products">
					<Product />
				</TabsContent>
			</Tabs>
			<div></div>
		</section>
	)
}

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex min-h-screen flex-col">
				<SiteHeader />
				<div className="flex-1">{children}</div>
			</div>
			<TailwindIndicator />
		</>
	)
}

export default App
