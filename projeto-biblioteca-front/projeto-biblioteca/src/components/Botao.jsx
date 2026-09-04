import styles from "./Botao.module.css"

function Botao({ children, onClick, tipo = "button", variante = "primario", tamanho = "padrao", disabled = false }) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.botao} ${styles[variante]} ${styles[tamanho]}`}
    >
      {children}
    </button>
  )
}

export default Botao
