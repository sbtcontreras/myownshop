import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../../styles/components/shop/ShopHeader.module.css"
import LoadingSpinner from "../others/LoadingSpinner"


export default function ShopHeader({ shopId, session }: { shopId: number, session: Session | null }) {

   const [shopData, setShopData] = useState({ image: "/others/avatar.jpg", name: "", email: "", telephone: "", bio: "", products: [{ name: "" }], address: "", user: { name: "", lastName: "", image: "" }, userId: -1, createdAt: "" })
   const [isLoading, setLoading] = useState(false)
   const [isContactFormOpen, setContactFormOpen] = useState(false)

   useEffect(() => {
      setLoading(true)
      fetch(`/api/shops/${shopId}`)
         .then((res) => res.json())
         .then((data) => {
            setShopData(data)
            setLoading(false)
         })
   }, [shopId])

   function openContact() {
      setContactFormOpen(!isContactFormOpen)
   }

   return (
      <div className={styles.container}>

         {isLoading && <LoadingSpinner height="withNavbar" />}

         {isContactFormOpen &&
            <div className={styles.contactContainer} >
               <div className={styles.contactForm}>
                  <h2> Contactarse: </h2>
                  <a className={styles.contactButton} href={`https://wa.me/56${shopData.telephone}?text=Hola%2C+tengo+una+duda%21`} > WhatsApp </a>
                  <a className={styles.contactButton} href={`mailto:${shopData.email}`}> Correo electrónico </a>
                  <a className={styles.contactButton} href={`tel:+56${shopData.telephone}`}> Teléfono </a>
                  <button className={styles.contactCloseButton} onClick={openContact}> Cerrar </button>
               </div>
            </div>
         }

         <div className={styles.shopHeader}>
            <div className={styles.shopHeaderMain}>
               <div className={styles.photoContainer}>
                  <Image className={styles.photo} src={shopData.image} alt={`Foto de perfil de tienda ${shopData.name} `} width="640" height="640" />
               </div>
               <div className={styles.nameContainer}>
                  <h3 className={styles.name}> <b> {shopData.name} </b> </h3>
                  <h4 className={styles.email}> {shopData.email} </h4>
               </div>

               <div className={styles.buttonsContainer}>
                  <button className={styles.button} onClick={openContact}> Contactarse </button>
                  {(session && (shopData.userId == session.user.id)) &&
                     <>
                        <Link className={styles.button} href={`./${shopId}/edit`}> Editar Tienda </Link>
                        <Link className={styles.button} href={`./${shopId}/product/create`}> Crear Producto </Link>
                     </>
                  }
               </div>
            </div>

            <div className={styles.shopHeaderDetails}>
               <h4 className={styles.telephone}>{shopData.telephone}</h4>
               <h4 className={styles.address}>{shopData.address}</h4>
            </div>
            <div className={styles.shopHeaderBio}>
               <p className={styles.bio}> {shopData.bio} </p>
            </div>

         </div>
      </div >
   )
}
