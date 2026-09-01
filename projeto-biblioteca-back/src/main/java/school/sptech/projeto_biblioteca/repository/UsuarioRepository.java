package school.sptech.projeto_biblioteca.repository;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import school.sptech.projeto_biblioteca.model.Usuario;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UsuarioRepository {

    private final JdbcTemplate jdbcTemplate;
    private final BeanPropertyRowMapper<Usuario> mapper = new BeanPropertyRowMapper<>(Usuario.class);

    public UsuarioRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Usuario findById(Integer id) {
        String sql = "SELECT * FROM usuario WHERE id = ?";
        List<Usuario> usuarios = jdbcTemplate.query(sql, mapper, id);
        return usuarios.isEmpty() ? null : usuarios.getFirst();
    }

    public Usuario save(Usuario usuario) {
        if (usuario.getId() != null && findById(usuario.getId()) != null) {
            String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
            jdbcTemplate.update(sql, usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getId());
            return usuario;
        }

        String sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, usuario.getNome());
            ps.setString(2, usuario.getEmail());
            ps.setString(3, usuario.getSenha());
            return ps;
        }, keyHolder);
        usuario.setId(keyHolder.getKey().intValue());
        return usuario;
    }

    public Usuario findByEmailAndSenha(String email, String senha) {
        String sql = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
        List<Usuario> usuarios = jdbcTemplate.query(sql, mapper, email, senha);
        return usuarios.isEmpty() ? null : usuarios.getFirst();
    }
}
