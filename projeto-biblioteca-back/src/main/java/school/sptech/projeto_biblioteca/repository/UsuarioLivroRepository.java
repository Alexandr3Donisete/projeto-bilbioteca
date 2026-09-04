package school.sptech.projeto_biblioteca.repository;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import school.sptech.projeto_biblioteca.model.Livro;

import java.util.List;

@Repository
public class UsuarioLivroRepository {

    private final JdbcTemplate jdbcTemplate;
    private final BeanPropertyRowMapper<Livro> livroMapper = new BeanPropertyRowMapper<>(Livro.class);

    public UsuarioLivroRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void emprestar(Integer usuarioId, Integer livroId) {
        String sql = "INSERT INTO usuario_livro (usuario_id, livro_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, usuarioId, livroId);
    }

    public int devolver(Integer usuarioId, Integer livroId) {
        String sql = "DELETE FROM usuario_livro WHERE usuario_id = ? AND livro_id = ?";
        return jdbcTemplate.update(sql, usuarioId, livroId);
    }

    public List<Livro> findLivrosByUsuarioId(Integer usuarioId) {
        String sql = """
                SELECT l.* FROM livro l
                INNER JOIN usuario_livro ul ON l.id = ul.livro_id
                WHERE ul.usuario_id = ?
                ORDER BY l.id
                """;
        return jdbcTemplate.query(sql, livroMapper, usuarioId);
    }

    public boolean existsByUsuarioIdAndLivroId(Integer usuarioId, Integer livroId) {
        String sql = "SELECT COUNT(*) FROM usuario_livro WHERE usuario_id = ? AND livro_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, usuarioId, livroId);
        return count != null && count > 0;
    }
}
