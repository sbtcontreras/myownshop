import { useState } from "react"
import Link from "next/link"
import { Session } from "next-auth"
import LoadingSpinner from "../others/LoadingSpinner"
import styles from "../../styles/components/profile/EditProfileForm.module.css"

export default function EditProfileForm({ session }: { session: Session }) {

	const [isLoading, setLoading] = useState(false)

	function handleSubmit(event: any) {
		event.preventDefault()
		setLoading(true)
		const formData = {
			name: event.target.name.value,
			lastName: event.target.lastName.value,
			rut: event.target.rut.value,
			telephone: event.target.telephone.value,
			bio: event.target.bio.value,
			image: event.target.image.value
		}
		fetch('/api/user', {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		}).then(() => { window.location.href = './..' });
	}
	return (
		<div className={styles.centerAll}>
			{isLoading && <LoadingSpinner height="withNavbar" />}
			<div className={styles.formContainer}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<label className={styles.formLabel}> Datos personales </label>
					<input className={styles.formInput} type="text" name="name" placeholder="Nombre" defaultValue={session.user.name}></input>
					<input className={styles.formInput} type="text" name="lastName" placeholder="Apellidos" defaultValue={session.user.lastName}></input>
					<input className={styles.formInput} type="text" name="rut" placeholder="Rut" defaultValue={session.user.rut}></input>
					<input className={styles.formInput} type="tel" name="telephone" placeholder="Número de teléfono" defaultValue={session.user.telephone}></input>
					<label className={styles.formLabel}> Datos para la cuenta </label>
					<div className={styles.formInput}> {session.user.email}</div>
					<input className={styles.formInput} type="text" name="image" placeholder="Coloca una URL de una imágen" defaultValue={session.user.image}></input>
					<input className={styles.formInput} type="text" name="bio" placeholder="Coloca un texto para tu biografía" defaultValue={session.user.bio}></input>
					<button className={styles.formButton} type="submit"> Editar Perfil  </button>
					<Link className={styles.formButton} id={styles.secondary} href={'./..'}> Atras </Link>
				</form>
			</div>
		</div>
	)
}
