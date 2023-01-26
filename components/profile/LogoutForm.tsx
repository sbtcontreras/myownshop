import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import styles from "../../styles/components/profile/LoginForm.module.css"

export default function LogoutForm({ session }: { session: Session }) {

  function handleSubmit(event: any) {
    event.preventDefault()
    signOut()
  }
  return (
    <div className={styles.centerAll}>
      <h1> ¿Estás seguro de que quieres salir de MyownShop? </h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button className={styles.formButton} type="submit"> Cerrar sesión </button>
        </form>
      </div>
    </div>
  )

}