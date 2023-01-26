import { useEffect, useState } from "react";
import ShopCard from "./ShopCard";
import styles from "../../styles/components/shop/Shops.module.css"
import LoadingSpinner from "../others/LoadingSpinner";
import SectionTitle from "../others/SectionTitle";

export default function Shops({ profileId }: { profileId: number }) {

	const [isLoading, setLoading] = useState(false)
	const [userData, setUserData] = useState({ image: "/others/avatar.jpg", name: "", lastName: "", shops: [], email: "", bio: "", createdAt: "" })

	useEffect(() => {
		setLoading(true)
		fetch(`/api/user`)
			.then((res) => res.json())
			.then((data) => {
				setUserData(data)
				setLoading(false)
			})
	}, [profileId])

	return (
		<div className={styles.container}>
			{isLoading && <LoadingSpinner height="withNavbar"/>}
			<SectionTitle text="Mis" boldText="Tiendas"/>
			<div className={styles.shopsContainer}>
				{userData.shops.map((shop, index) => {
					return (
						<ShopCard key={index} shopInfo={shop} />
					)
				})}
			</div>
		</div>
	)
}