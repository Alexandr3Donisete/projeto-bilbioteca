import { useState } from "react"
import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import Perfil from "./pages/Perfil.jsx"
import Catalogo from "./pages/Catalogo.jsx"
import AdminLivros from "./pages/AdminLivros.jsx"
import Navbar from "./components/Navbar.jsx"
import styles from "./App.module.css"

const NOME_APP = "BIBLIOTECA DA XANDA"

function App() {
  const [tela, setTela] = useState("login")
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  function handleLogout() {
    setUsuarioLogado(null)
    setTela("login")
  }

  const titulo = <h1 className={styles.titulo}>{NOME_APP}</h1>

  if (tela === "admin" && usuarioLogado) {
    return <AdminLivros usuario={usuarioLogado} onLogout={handleLogout} />
  }

  if (tela === "catalogo" && usuarioLogado) {
    return (
      <>
        <Navbar pagina={tela} onNavigate={setTela} onLogout={handleLogout} />
        <Catalogo usuario={usuarioLogado} />
      </>
    )
  }

  if (tela === "perfil" && usuarioLogado) {
    return (
      <>
        <Navbar pagina="perfil" onNavigate={setTela} onLogout={handleLogout} />
        <Perfil usuario={usuarioLogado} />
      </>
    )
  }

  if (tela === "cadastro") {
    return (
      <div className={styles.auth}>
        {titulo}
        <Cadastro aoFinalizar={() => setTela("login")} />
        <footer className={styles.footer}>
          Foto de fundo: Brent Singleton — Pexels
        </footer>
      </div>
    )
  }

  return (
    <div className={styles.auth}>
      {titulo}
      <Login
        onLogin={(u) => {
          setUsuarioLogado(u)
          setTela("perfil")
        }}
        onAdminLogin={(u) => {
          setUsuarioLogado(u)
          setTela("admin")
        }}
        onCadastro={() => setTela("cadastro")}
      />
      <footer className={styles.footer}>
        Foto de fundo: Brent Singleton — Pexels
      </footer>
    </div>
  )
}

export default App
