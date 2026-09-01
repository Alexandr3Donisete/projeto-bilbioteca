import styles from "./Campo.module.css"

function Campo({ tipo, placeholder, valor, onChange }) {
  return (
    <input
      type={tipo}
      placeholder={placeholder}
      value={valor}
      onChange={onChange}
      className={styles.input}
    />
  )
}

export default Campo
