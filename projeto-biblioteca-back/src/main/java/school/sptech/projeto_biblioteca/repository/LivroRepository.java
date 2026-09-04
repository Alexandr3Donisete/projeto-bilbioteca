package school.sptech.projeto_biblioteca.repository;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.projeto_biblioteca.model.Livro;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class LivroRepository {

    private final JdbcTemplate jdbcTemplate;
    private final BeanPropertyRowMapper<Livro> mapper = new BeanPropertyRowMapper<>(Livro.class);

    public LivroRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Livro> findAll() {
        String sql = "SELECT * FROM livro ORDER BY id";
        return jdbcTemplate.query(sql, mapper);
    }

    public Livro findById(Integer id) {
        String sql = "SELECT * FROM livro WHERE id = ?";
        List<Livro> livros = jdbcTemplate.query(sql, mapper, id);
        return livros.isEmpty() ? null : livros.getFirst();
    }

    public Livro save(Livro livro) {
        if (livro.getId() != null && findById(livro.getId()) != null) {
            String sql = "UPDATE livro SET titulo = ?, ano_publicacao = ?, genero = ?, quantidade = ?, autor = ? WHERE id = ?";
            jdbcTemplate.update(sql, livro.getTitulo(), livro.getAnoPublicacao(), livro.getGenero(), livro.getQuantidade(), livro.getAutor(), livro.getId());
            return livro;
        }

        String sql = "INSERT INTO livro (titulo, ano_publicacao, genero, quantidade, autor) VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, livro.getTitulo());
            ps.setInt(2, livro.getAnoPublicacao());
            ps.setString(3, livro.getGenero());
            ps.setInt(4, livro.getQuantidade());
            ps.setString(5, livro.getAutor());
            return ps;
        }, keyHolder);
        livro.setId(keyHolder.getKey().intValue());
        return livro;
    }

    public void deleteById(Integer id) {
        String sql = "DELETE FROM livro WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void atualizarQuantidade(Integer id, int delta) {
        String sql = "UPDATE livro SET quantidade = quantidade + ? WHERE id = ?";
        jdbcTemplate.update(sql, delta, id);
    }
}
