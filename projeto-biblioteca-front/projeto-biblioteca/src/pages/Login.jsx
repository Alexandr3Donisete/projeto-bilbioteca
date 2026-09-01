import { useState } from "react"
import Formulario from "../components/Formulario.jsx"
import Campo from "../components/Campo.jsx"
import Botao from "../components/Botao.jsx"
import MensagemErro from "../components/MensagemErro.jsx"

const API = "http://localhost:8080"
const ADMIN_EMAIL = "admin@email.com"

function Login({ onLogin, onCadastro, onAdminLogin }) {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setErro("")

    if (!email || !senha) {
      setErro("Preencha todos os campos.")
      return
    }

    try {
      const res = await fetch(`${API}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })

      if (res.status === 200) {
        const usuario = await res.json()
        if (usuario.email === ADMIN_EMAIL) {
          onAdminLogin(usuario)
        } else {
          onLogin(usuario)
        }
      } else if (res.status === 401) {
        setErro("Email ou senha inválidos.")
      } else {
        setErro("Erro ao fazer login.")
      }
    } catch {
      setErro("Não foi possível conectar ao servidor.")
    }
  }

  return (
    <Formulario titulo="Login" onSubmit={handleSubmit}>
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
      <Botao tipo="submit">Entrar</Botao>
      <Botao onClick={onCadastro} variante="secundario">
        Criar conta
      </Botao>
      <MensagemErro texto={erro} />
    </Formulario>
  )
}

export default Login
