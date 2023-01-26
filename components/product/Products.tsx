import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/components/product/Products.module.css"
import LoadingSpinner from "../others/LoadingSpinner";
import SectionTitle from "../others/SectionTitle";
import { Session } from "next-auth";

export default function Products({ shopId, session }: { shopId: number, session: Session | null }) {

	const [isLoading, setLoading] = useState(false)
	const [shopData, setShopData] = useState({ image: "/others/avatar.jpg", name: "", lastName: "", products: [], email: "", bio: "", createdAt: "", user: { id: "" } })

	useEffect(() => {
		setLoading(true)
		fetch(`/api/shops/${shopId}}`)
			.then((res) => res.json())
			.then((data) => {
				setShopData(data)
				setLoading(false)
				console.log(data)
			})
	}, [shopId])

	return (
		<div className={styles.container}>
			{isLoading && <LoadingSpinner height="withNavbar" />}
			<SectionTitle text="Productos" boldText="Disponibles" />
			<div className={styles.productsContainer}>
				{shopData.products.map((product, index) => {
					return (
						<ProductCard key={index} productInfo={product} adminPanel={(parseInt(shopData.user.id) == session?.user.id)} />
					)
				})}
			</div>
		</div>
	)
}