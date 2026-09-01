import styles from "./MensagemErro.module.css"

function MensagemErro({ texto }) {
  if (!texto) return null
  return <p className={styles.erro}>{texto}</p>
}

export default MensagemErro
