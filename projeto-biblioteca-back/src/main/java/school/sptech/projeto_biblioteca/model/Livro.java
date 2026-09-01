package school.sptech.projeto_biblioteca.model;

public class Livro {
    private Integer id;
    private String titulo;
    private Integer anoPublicacao;
    private String genero;
    private Integer quantidade;
    private String autor;
    private Integer usuarioId;

    public Livro() {
    }

    public Livro(Integer id, String titulo, Integer anoPublicacao, String genero, Integer quantidade, String autor, Integer usuarioId) {
        this.id = id;
        this.titulo = titulo;
        this.anoPublicacao = anoPublicacao;
        this.genero = genero;
        this.quantidade = quantidade;
        this.autor = autor;
        this.usuarioId = usuarioId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Integer getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(Integer anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }
}
