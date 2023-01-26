import { signIn } from "next-auth/react"
import { useState } from "react"
import styles from "../../styles/components/profile/LoginForm.module.css"
import LoadingSpinner from "../others/LoadingSpinner"

export default function SignupForm() {

  const [isLoading, setLoading] = useState(false)

  function handleSubmit(event: any) {
    setLoading(true)
    event.preventDefault()
    const loginData = { email: event.target.email.value }
    signIn("email", loginData)
  }

  return (
    <div className={styles.centerAll}>
      <h1> Registrarse en MyownShop </h1>
      {isLoading && <LoadingSpinner height="withNavbar" />}
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.formInput} type="email" id="email" name="email" placeholder="Correo electrónico"></input>
          <button className={styles.formButton} type="submit"> Registrarse </button>
        </form>
      </div>
    </div>
  )
}