import Link from "next/link";
import Image from 'next/image';
import styles from "../../styles/components/others/HamburguerHeader.module.css";
import nextLogo from '/public/next.svg';
import hamburguerIcon from '/public/icons/hamburguer.svg';
import xIcon from '/public/icons/x.svg';
import { useState } from 'react';
import { Session } from "next-auth";

export default function HamburguerHeader({ session = null }: { session: Session | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logoContainer}>
          <Image className={styles.logo} src={nextLogo} alt='Next Logo' />
        </Link>
        <div className={styles.hamburguerContainer} >
          <div className={styles.hamburguerButton} onClick={() => setOpen(!open)}> <Image className={styles.hamburguerIcon} src={(open) ? xIcon : hamburguerIcon} alt="Hamburguer Icon" /> </div>
        </div>
      </div>

      <nav className={styles.navContainer} id={(open) ? styles.open : styles.closed}>
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
    </>
  );
}