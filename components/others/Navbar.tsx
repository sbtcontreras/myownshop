import { Session } from 'next-auth';
import Link from 'next/link';
import styles from '../../styles/components/others/Navbar.module.css'

export default function Navbar({ session = null }: { session: Session | null }) {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.nav}>
        {session
          ? <>
            <li className={styles.button} id={styles.mainButton}> <div className={styles.buttonContent}> {session.user.email} </div></li>
            <li className={styles.button}><Link className={styles.buttonContent} href='/profile'>Dashboard</Link></li>
            <li className={styles.button}><Link className={styles.buttonContent} href="/logout">Salir</Link></li>
          </>
          : <>
            <li className={styles.button}><Link className={styles.buttonContent} href="/">Inicio</Link></li>
            <li className={styles.button}><Link className={styles.buttonContent} href="/login">Iniciar Sesión</Link></li>
            <li className={styles.button}><Link className={styles.buttonContent} href="/signup">Registrarse</Link></li>
          </>}
      </ul>
    </nav>
  )
}