import { useEffect, useState } from "react"
import styles from "../../styles/components/product/EditProductForm.module.css"
import Link from "next/link"
import LoadingSpinner from "../others/LoadingSpinner"
import { Session } from "next-auth"

export default function EditProductForm({ productId, session }: { productId: number, session: Session }) {

   const [productData, setProductData] = useState({ id: "", name: "", price: "", description: "", quantity: "", image: "", discountPercent: "", shopId: "", shop: { user: { id: "", email: "" } } })
   const [isLoading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      fetch(`/api/products/${productId}`)
         .then((res) => res.json())
         .then((data) => {
            if (parseInt(data.shop.user.id) != session.user.id) {
               window.location.href = "/login"
            }
            else {
               setProductData(data)
               setLoading(false)
            }
         })
   }, [productId])

   function handleSubmit(event: any) {
      setLoading(true)
      event.preventDefault()
      const formData = {
         shop: { id: productData.shopId },
         product: {
            name: event.target.name.value,
            price: parseInt(event.target.price.value),
            description: event.target.description.value,
            quantity: parseInt(event.target.quantity.value),
            image: event.target.image.value,
            discountPercent: parseInt(event.target.discountPercent.value)
         }
      }
      fetch(`/api/products/${productId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData)
      }).then(() => { window.location.href = `/shop/${productData.shopId}` });
   }

   return (
      <div className={styles.centerAll}>
         {isLoading && <LoadingSpinner height="withNavbar" />}
         <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
               <h1> Editando Producto </h1>
               <label className={styles.formLabel}> Datos obligatorios </label>
               <input className={styles.formInput} type="text" name="name" placeholder="Nombre del producto" defaultValue={productData.name} />
               <input className={styles.formInput} type="number" name="price" min={0} placeholder="Precio del producto" defaultValue={productData.price} />
               <input className={styles.formInput} type="text" name="description" placeholder="Descripción del producto" defaultValue={productData.description} />
               <input className={styles.formInput} type="number" name="quantity" max={100} min={0} placeholder="Cantidad disponible del producto" defaultValue={productData.quantity} />
               <label className={styles.formLabel}> Datos opcionales </label>
               <input className={styles.formInput} type="text" name="image" placeholder="Coloca una URL de una imágen" defaultValue={productData.image} />
               <input className={styles.formInput} type="number" name="discountPercent" max={100} min={0} placeholder="Coloca un porcentaje de descuento para el producto" defaultValue={productData.discountPercent} />
               <button className={styles.formButton} type="submit"> Editar producto </button>
               <Link className={styles.formButton} id={styles.secondary} href={`/shop/${productData.shopId}`}> Atras </Link>
            </form>
         </div>
      </div>
   )
}
