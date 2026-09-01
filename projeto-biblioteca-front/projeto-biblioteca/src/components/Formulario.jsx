import styles from "./Formulario.module.css"

function Formulario({ titulo, children, onSubmit }) {
  return (
    <div className={styles.container}>
      <h1> {titulo} </h1>
      <form onSubmit={onSubmit} className={styles.form}>
        {children}
      </form>
    </div>
  )
}

export default Formulario
