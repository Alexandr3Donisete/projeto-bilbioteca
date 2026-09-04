package school.sptech.projeto_biblioteca.model;

import java.time.LocalDate;

public class UsuarioLivro {
    private Integer usuarioId;
    private Integer livroId;
    private LocalDate dataEmprestimo;

    public UsuarioLivro() {
    }

    public UsuarioLivro(Integer usuarioId, Integer livroId, LocalDate dataEmprestimo) {
        this.usuarioId = usuarioId;
        this.livroId = livroId;
        this.dataEmprestimo = dataEmprestimo;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getLivroId() {
        return livroId;
    }

    public void setLivroId(Integer livroId) {
        this.livroId = livroId;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }
}
