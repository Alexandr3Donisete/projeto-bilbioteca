import styles from "./CardLivro.module.css"

function CardLivro({ livro, children }) {
  return (
    <li className={styles.card}>
      <div className={styles.info}>
        <strong>{livro.titulo}</strong>
        <span>Autor: {livro.autor}</span>
        <span>Ano: {livro.anoPublicacao}</span>
        <span>Gênero: {livro.genero}</span>
        <span>Quantidade: {livro.quantidade}</span>
      </div>
      <div className={styles.acoes}>
        {children}
      </div>
    </li>
  )
}

export default CardLivro
