import { useState } from 'react'
import styles from '../../styles/components/shop/CreateShopForm.module.css'
import LoadingSpinner from '../others/LoadingSpinner'
import Link from 'next/link'

export default function CreateShopForm() {
   const [isLoading, setLoading] = useState(false)

   function handleSubmit(event: any) {
      setLoading(true)
      event.preventDefault()
      const formData = {
         name: event.target.name.value,
         email: event.target.email.value,
         telephone: event.target.telephone.value,
         address: event.target.address.value,
         image: event.target.image.value,
         bio: event.target.bio.value
      }
      fetch('/api/shops/', {
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
               <h1> Creando Tienda </h1>
               <label className={styles.formLabel}> Datos obligatorios </label>
               <input className={styles.formInput} type="text" name="name" placeholder="Nombre de la tienda" />
               <input className={styles.formInput} type="email" name="email" placeholder="Correo electrónico de contacto" />
               <input className={styles.formInput} type="tel" name="telephone" placeholder="Número de teléfono de contacto" />
               <label className={styles.formLabel}> Datos opcionales </label>
               <input className={styles.formInput} type="text" name="address" placeholder="Escribe la dirección de la tienda" />
               <input className={styles.formInput} type="text" name="image" placeholder="Coloca una URL de una imágen" />
               <input className={styles.formInput} type="text" name="bio" placeholder="Coloca un texto para tu biografía" />
               <button className={styles.formButton} type="submit"> Crear tienda </button>
               <Link className={styles.formButton} id={styles.secondary} href={'/profile'}> Atras </Link>
            </form>
         </div>
      </div>
   )
}