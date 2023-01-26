import { useEffect, useState } from "react"
import styles from "../../styles/components/shop/EditShopForm.module.css"
import Link from "next/link"
import LoadingSpinner from "../others/LoadingSpinner"
import { Session } from "next-auth"

export default function EditShopForm({ shopId, session }: { shopId: number, session: Session }) {

   const [shopData, setShopData] = useState({ id: "", name: "", email: "", telephone: "", address: "", image: "", bio: "", user: { id: "", email: "" } })
   const [isLoading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      fetch(`/api/shops/${shopId}`)
         .then((res) => res.json())
         .then((data) => {
            if (parseInt(data.user.id) != session.user.id) {
               window.location.href = "/login"
            }
            else {
               setShopData(data)
               setLoading(false)
            }
         })
   }, [shopId])

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
      fetch(`/api/shops/${shopId}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData)
      }).then(() => { window.location.href = `/shop/${shopData.id}` });
   }

   return (
      <div className={styles.centerAll}>
         {isLoading && <LoadingSpinner height="withNavbar" />}
         <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
               <h1> Editando Tienda </h1>
               <label className={styles.formLabel}> Datos obligatorios </label>
               <div className={styles.formInput}> Tienda de: {shopData.user.email} </div>
               <input className={styles.formInput} type="text" name="name" placeholder="Nombre de la tienda" defaultValue={shopData.name} />
               <input className={styles.formInput} type="email" name="email" placeholder="Correo electrónico de contacto" defaultValue={shopData.email} />
               <input className={styles.formInput} type="tel" name="telephone" placeholder="Número de teléfono de contacto" defaultValue={shopData.telephone} />
               <label className={styles.formLabel}> Datos opcionales </label>
               <input className={styles.formInput} type="text" name="address" placeholder="Escribe la dirección de la tienda" defaultValue={shopData.address} />
               <input className={styles.formInput} type="text" name="image" placeholder="Coloca una URL de una imágen" defaultValue={shopData.image} />
               <input className={styles.formInput} type="text" name="bio" placeholder="Coloca un texto para tu biografía" defaultValue={shopData.bio} />
               <button className={styles.formButton} type="submit"> Editar tienda </button>
               <Link className={styles.formButton} id={styles.secondary} href={`/shop/${shopData.id}`}> Atras </Link>
            </form>
         </div>
      </div>
   )
}
