import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/components/product/ProductCard.module.css"

export default function ProductCard({ productInfo, adminPanel }: { productInfo: Product, adminPanel: boolean }) {
   return (
      <div className={styles.card}>
         <div className={styles.imageContainer}>
            <Image src={productInfo.image || "/others/avatar.jpg"} alt={`Foto del producto ${productInfo.name}`} width='64' height='64' />
         </div>

         <div className={styles.infoContainer}>

            <div className={styles.nameContainer}>
               <h4 className={styles.name}> {productInfo.name}</h4>
            </div>

            <div className={styles.descriptionContainer}>
               <p className={styles.description}> {productInfo.description} </p>
            </div>

         </div>

         <div className={styles.priceContainer}>
            <p className={styles.price}> ${productInfo.price}</p>
         </div>

         <div className={styles.buyContainer}>
            <input type="number" className={styles.numberField} defaultValue={1} min={0} max={20} required step={1} />
            <button className={styles.buyButton}> Comprar </button>
         </div>

         {adminPanel &&
            <div className={styles.adminContainer}>
               <Link className={styles.buyButton} href={`/product/${productInfo.id}/edit`}> Editar </Link>
            </div>
         }
      </div>

   )
}