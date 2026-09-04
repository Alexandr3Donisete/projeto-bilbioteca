import { useEffect, useState } from "react"
import Botao from "../components/Botao.jsx"
import Modal from "../components/Modal.jsx"
import Formulario from "../components/Formulario.jsx"
import Campo from "../components/Campo.jsx"
import MensagemErro from "../components/MensagemErro.jsx"
import listStyles from "./listStyles.module.css"
import styles from "./AdminLivros.module.css"

const API = "http://localhost:8080"

const estadoInicial = {
  titulo: "",
  autor: "",
  anoPublicacao: "",
  genero: "",
  quantidade: "",
}

function AdminLivros({ usuario, onLogout }) {
  const [livros, setLivros] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [livroEditando, setLivroEditando] = useState(null)
  const [form, setForm] = useState(estadoInicial)
  const [erro, setErro] = useState("")

  async function carregarLivros() {
    try {
      const res = await fetch(`${API}/livros`, { method: "GET" })
      const data = await res.json()
      setLivros(data)
    } catch {
      setLivros([])
    }
  }

  useEffect(() => {
    carregarLivros()
  }, [])

  function abrirAdicionar() {
    setLivroEditando(null)
    setForm(estadoInicial)
    setErro("")
    setModalAberto(true)
  }

  function abrirEditar(livro) {
    setLivroEditando(livro)
    setForm({
      titulo: livro.titulo,
      autor: livro.autor,
      anoPublicacao: String(livro.anoPublicacao),
      genero: livro.genero,
      quantidade: String(livro.quantidade),
    })
    setErro("")
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setLivroEditando(null)
    setForm(estadoInicial)
    setErro("")
  }

  function atualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  async function handleSalvar(e) {
    e.preventDefault()
    setErro("")

    if (!form.titulo || !form.autor || !form.anoPublicacao || !form.genero || !form.quantidade) {
      setErro("Preencha todos os campos.")
      return
    }

    const body = {
      titulo: form.titulo,
      autor: form.autor,
      anoPublicacao: Number(form.anoPublicacao),
      genero: form.genero,
      quantidade: Number(form.quantidade),
    }

    try {
      const url = livroEditando
        ? `${API}/livros/${livroEditando.id}`
        : `${API}/livros`
      const method = livroEditando ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (res.status === 200 || res.status === 201) {
        fecharModal()
        carregarLivros()
      } else if (res.status === 400) {
        setErro("Dados inválidos.")
      } else {
        setErro("Erro ao salvar livro.")
      }
    } catch {
      setErro("Não foi possível conectar ao servidor.")
    }
  }

  async function handleExcluir(id) {
    try {
      await fetch(`${API}/livros/${id}`, { method: "DELETE" })
      carregarLivros()
    } catch {
      setErro("Erro ao excluir livro. Tente novamente.")
    }
  }

  return (
    <div className={`${listStyles.container} ${styles.adminPage}`}>
      <header className={styles.header}>
        <h1>Painel Admin</h1>
        <div className={styles.headerDireita}>
          <span className={styles.nome}>{usuario.nome}</span>
          <Botao onClick={onLogout} variante="secundario">
            Sair
          </Botao>
        </div>
      </header>

      <div className={styles.topo}>
        <h2>Todos os Livros</h2>
        <Botao onClick={abrirAdicionar}>Adicionar livro</Botao>
      </div>

      {livros.length === 0 ? (
        <p className={listStyles.vazio}>Nenhum livro encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {livros.map((livro) => (
            <li key={livro.id} className={styles.card}>
              <div className={styles.info}>
                <strong>{livro.titulo}</strong>
                <span>Autor: {livro.autor}</span>
                <span>Ano: {livro.anoPublicacao}</span>
                <span>Gênero: {livro.genero}</span>
                <span>Quantidade: {livro.quantidade}</span>
              </div>
              <div className={styles.botoes}>
                <Botao onClick={() => abrirEditar(livro)} variante="secundario">
                  Editar
                </Botao>
                <Botao onClick={() => handleExcluir(livro.id)} variante="secundario">
                  Excluir
                </Botao>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        aberto={modalAberto}
        onFechar={fecharModal}
        titulo={livroEditando ? "Editar Livro" : "Adicionar Livro"}
      >
        <Formulario onSubmit={handleSalvar}>
          <Campo
            tipo="text"
            placeholder="Título"
            valor={form.titulo}
            onChange={(e) => atualizarCampo("titulo", e.target.value)}
          />
          <Campo
            tipo="text"
            placeholder="Autor"
            valor={form.autor}
            onChange={(e) => atualizarCampo("autor", e.target.value)}
          />
          <Campo
            tipo="number"
            placeholder="Ano de publicação"
            valor={form.anoPublicacao}
            onChange={(e) => atualizarCampo("anoPublicacao", e.target.value)}
          />
          <Campo
            tipo="text"
            placeholder="Gênero"
            valor={form.genero}
            onChange={(e) => atualizarCampo("genero", e.target.value)}
          />
          <Campo
            tipo="number"
            placeholder="Quantidade"
            valor={form.quantidade}
            onChange={(e) => atualizarCampo("quantidade", e.target.value)}
          />
          <MensagemErro texto={erro} />
          <Botao tipo="submit">Salvar</Botao>
          <Botao onClick={fecharModal} variante="secundario">
            Cancelar
          </Botao>
        </Formulario>
      </Modal>
    </div>
  )
}

export default AdminLivros
