import Botao from "./Botao.jsx"
import styles from "./Navbar.module.css"

const NOME_APP = "BIBLIOTECA DA XANDA"

function Navbar({ pagina, onNavigate, onLogout }) {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>{NOME_APP}</span>
      <div className={styles.links}>
        <button
          onClick={() => onNavigate("catalogo")}
          className={`${styles.link} ${pagina === "catalogo" ? styles.ativo : ""}`}
        >
          Catálogo
        </button>
        <button
          onClick={() => onNavigate("perfil")}
          className={`${styles.link} ${pagina === "perfil" ? styles.ativo : ""}`}
        >
          Perfil
        </button>
      </div>
      <Botao onClick={onLogout} variante="secundario" tamanho="pequeno">
        Sair
      </Botao>
    </nav>
  )
}

export default Navbar
