import styles from "../../styles/components/others/LoadingSpinner.module.css"

export default function LoadingSpinner({height = "fullscreen"}: {height: "fullscreen"|"withNavbar"}) {
  return (
    <div className={styles.spinnerContainer} id={(height === "fullscreen") ? styles.fullscreen : styles.withnavbar } >
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  )
}