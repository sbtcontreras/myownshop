import { useState } from 'react'
import styles from '../../styles/components/product/CreateProductForm.module.css'
import LoadingSpinner from '../others/LoadingSpinner'
import Link from 'next/link'

export default function CreateProductForm({ shopId }: { shopId: number }) {
   const [isLoading, setLoading] = useState(false)

   function handleSubmit(event: any) {
      setLoading(true)
      event.preventDefault()
      const formData = {
         shop: { id: shopId },
         product: {
            name: event.target.name.value,
            price: parseInt(event.target.price.value),
            description: event.target.description.value,
            quantity: parseInt(event.target.quantity.value),
            image: event.target.image.value,
            discountPercent: parseInt(event.target.discountPercent.value)
         }
      }
      fetch('/api/products', {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData)
      }).then(() => { window.location.href = './..' });
   }

   return (
      <div className={styles.centerAll}>
         {isLoading && <LoadingSpinner height="withNavbar" />}
         <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
               <h1> Creando Producto </h1>
               <label className={styles.formLabel}> Datos obligatorios </label>
               <input className={styles.formInput} type="text" name="name" placeholder="Nombre del producto" />
               <input className={styles.formInput} type="number" name="price" min={0} placeholder="Precio del producto" />
               <input className={styles.formInput} type="text" name="description" placeholder="Descripción del producto" />
               <input className={styles.formInput} type="number" name="quantity" max={100} min={0}  placeholder="Cantidad disponible del producto" />
               <label className={styles.formLabel}> Datos opcionales </label>
               <input className={styles.formInput} type="text" name="image" placeholder="Coloca una URL de una imágen" />
               <input className={styles.formInput} type="number" name="discountPercent" max={100} min={0} placeholder="Coloca un porcentaje de descuento para el producto" />
               <button className={styles.formButton} type="submit"> Crear producto </button>
               <Link className={styles.formButton} id={styles.secondary} href={`/shop/${shopId}`}> Atras </Link>
            </form>
         </div>
      </div>
   )
}