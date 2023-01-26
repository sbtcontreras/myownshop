import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/components/profile/ProfileHeader.module.css"

export default function ProfileHeader({ session }: { session: Session }) {
	const sessionData = session.user

	return (
		<div className={styles.container}>
			<div className={styles.profileHeader}>
				<div className={styles.profileHeaderMain}>
					<div className={styles.photoContainer}>
						<Image className={styles.photo} src={sessionData.image} alt={`Foto de perfil de ${sessionData.name} ${sessionData.lastName} `} width="640" height="640" />
					</div>
					<div className={styles.nameContainer}>
						<h3 className={styles.name}> {sessionData.name} <b> {sessionData.lastName} </b> </h3>
						<h4 className={styles.email}> {sessionData.email} </h4>
					</div>
					<div className={styles.buttonsContainer}>
						<Link className={styles.button} href='/profile/edit'> Editar Perfil </Link>
						<Link className={styles.button} id={styles.secondary} href='/shop/create'> Crear Tienda </Link>
					</div>
				</div>
				<div className={styles.profileHeaderBio}>
					<p className={styles.bio}> {sessionData.bio} </p>
				</div>
			</div>
		</div>
	)
}
