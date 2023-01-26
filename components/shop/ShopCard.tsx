import { Shop } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/components/shop/ShopCard.module.css"

export default function ShopCard({ shopInfo }: { shopInfo: Shop }) {
   return (
      <Link href={`/shop/${shopInfo.id}`} className= {styles.card}>
         
         <div className={styles.shopHeader}>
            <div className={styles.imageContainer}>
               <Image src={shopInfo.image || "/others/avatar.jpg"} alt={`Foto de perfil de tienda ${shopInfo.name}`} width='64' height='64'/>
            </div>

            <div className={styles.nameContainer}>
               <h4 className={styles.name}> {shopInfo.name}</h4>
            </div>
         </div>

         <div className={styles.bioContainer}>
            <p className={styles.bio}> {shopInfo.bio} </p>
         </div>

         <div className={styles.statusContainer}>
            <h5 className={styles.status}> {shopInfo.status} </h5>
         </div>
   
      </Link>

   )
}