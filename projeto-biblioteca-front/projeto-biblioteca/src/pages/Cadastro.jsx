import { useState } from "react"
import Formulario from "../components/Formulario.jsx"
import Campo from "../components/Campo.jsx"
import Botao from "../components/Botao.jsx"
import MensagemErro from "../components/MensagemErro.jsx"

const API = "http://localhost:8080"

function Cadastro({ aoFinalizar }) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.")
      return
    }

    try {
      const res = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      })

      if (res.status === 201) {
        aoFinalizar()
      } else if (res.status === 400) {
        setErro("Dados inválidos.")
      } else {
        setErro("Erro ao cadastrar.")
      }
    } catch {
      setErro("Não foi possível conectar ao servidor.")
    }
  }

  return (
    <Formulario titulo="Cadastro" onSubmit={handleSubmit}>
      <Campo
        tipo="text"
        placeholder="Nome"
        valor={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Campo
        tipo="email"
        placeholder="Email"
        valor={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Campo
        tipo="password"
        placeholder="Senha"
        valor={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <Botao tipo="submit">Cadastrar</Botao>
      <Botao onClick={aoFinalizar} variante="secundario">
        Voltar
      </Botao>
      <MensagemErro texto={erro} />
    </Formulario>
  )
}

export default Cadastro
