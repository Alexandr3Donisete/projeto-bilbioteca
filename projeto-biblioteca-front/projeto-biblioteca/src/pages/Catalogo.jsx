import { useEffect, useState } from "react"
import Botao from "../components/Botao.jsx"
import CardLivro from "../components/CardLivro.jsx"
import listStyles from "./listStyles.module.css"
import styles from "./Catalogo.module.css"

const API = "http://localhost:8080"

function Catalogo({ usuario }) {
  const [livros, setLivros] = useState([])
  const [meusLivros, setMeusLivros] = useState([])

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resTodos = await fetch(`${API}/livros`, { method: "GET" })
        const todos = await resTodos.json()
        setLivros(todos)

        const resMeus = await fetch(`${API}/livros/usuario/${usuario.id}`, { method: "GET" })
        const meus = await resMeus.json()
        setMeusLivros(meus)
      } catch {
        setLivros([])
        setMeusLivros([])
      }
    }
    carregarLivros()
  }, [usuario.id])

  const meusIds = meusLivros.map((l) => l.id)

  async function handlePegar(livro) {
    try {
      await fetch(`${API}/livros/${livro.id}/emprestar?usuarioId=${usuario.id}`, {
        method: "POST",
      })
      const resTodos = await fetch(`${API}/livros`, { method: "GET" })
      const todos = await resTodos.json()
      setLivros(todos)

      const resMeus = await fetch(`${API}/livros/usuario/${usuario.id}`, { method: "GET" })
      const meus = await resMeus.json()
      setMeusLivros(meus)
    } catch {
      // falha silenciosa
    }
  }

  return (
    <div className={listStyles.container}>
      <h2> Catálogo de Livros </h2>

      {livros.length === 0 ? (
        <p className={listStyles.vazio}>Nenhum livro encontrado.</p>
      ) : (
        <ul className={listStyles.list}>
          {livros.map((livro) => (
            <CardLivro key={livro.id} livro={livro}>
              {meusIds.includes(livro.id) ? (
                <span className={styles.jaAdicionado}>Na coleção</span>
              ) : (
                <Botao onClick={() => handlePegar(livro)} disabled={livro.quantidade <= 0}>
                  Pegar
                </Botao>
              )}
            </CardLivro>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Catalogo
