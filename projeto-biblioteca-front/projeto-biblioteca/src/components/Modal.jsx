import { useEffect } from "react"
import styles from "./Modal.module.css"

function Modal({ aberto, onFechar, titulo, children }) {
  useEffect(() => {
    if (!aberto) return

    function handleEscape(e) {
      if (e.key === "Escape") onFechar()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [aberto, onFechar])

  if (!aberto) return null

  return (
    <div className={styles.overlay} onClick={onFechar}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>{titulo}</h2>
          <button onClick={onFechar} className={styles.fechar}>
            &times;
          </button>
        </header>
        <div className={styles.conteudo}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
