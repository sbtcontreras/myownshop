import styles from "../../styles/components/others/SectionTitle.module.css"

export default function SectionTitle({text="Titulo", boldText="Destacado"}) {
  return (
      <div className={styles.titleContainer}>
        <h1 className={styles.title}> {text} <b id={styles.focus}> {boldText} </b></h1>
        <div className={styles.underLine}/>
      </div>
  );
}