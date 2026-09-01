import { useEffect, useState } from "react"
import Botao from "../components/Botao.jsx"
import CardLivro from "../components/CardLivro.jsx"
import styles from "./listStyles.module.css"

const API = "http://localhost:8080"

function Perfil({ usuario }) {
  const [livros, setLivros] = useState([])

  useEffect(() => {
    async function carregarLivros() {
      try {
        const res = await fetch(`${API}/livros?usuarioId=${usuario.id}`, { method: "GET" })
        const data = await res.json()
        setLivros(data)
      } catch {
        setLivros([])
      }
    }
    carregarLivros()
  }, [usuario.id])

  async function handleRemoverDaColecao(livro) {
    try {
      await fetch(`${API}/livros/${livro.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...livro, usuarioId: null }),
      })
      const res = await fetch(`${API}/livros?usuarioId=${usuario.id}`, { method: "GET" })
      const data = await res.json()
      setLivros(data)
    } catch {
      // falha silenciosa
    }
  }

  return (
    <div className={styles.container}>
      <h2> Meus Livros </h2>

      {livros.length === 0 ? (
        <p className={styles.vazio}>Nenhum livro encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {livros.map((livro) => (
            <CardLivro key={livro.id} livro={livro}>
              <Botao onClick={() => handleRemoverDaColecao(livro)} variante="secundario">
                Remover
              </Botao>
            </CardLivro>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Perfil
