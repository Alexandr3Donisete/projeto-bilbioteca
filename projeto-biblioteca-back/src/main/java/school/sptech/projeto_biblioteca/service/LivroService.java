package school.sptech.projeto_biblioteca.service;

import org.springframework.stereotype.Service;
import school.sptech.projeto_biblioteca.model.Livro;
import school.sptech.projeto_biblioteca.repository.LivroRepository;
import school.sptech.projeto_biblioteca.repository.UsuarioLivroRepository;
import school.sptech.projeto_biblioteca.repository.UsuarioRepository;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;
    private final UsuarioLivroRepository usuarioLivroRepository;
    private final UsuarioRepository usuarioRepository;

    public LivroService(LivroRepository livroRepository, UsuarioLivroRepository usuarioLivroRepository, UsuarioRepository usuarioRepository) {
        this.livroRepository = livroRepository;
        this.usuarioLivroRepository = usuarioLivroRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Livro emprestar(Integer livroId, Integer usuarioId) {
        Livro livro = livroRepository.findById(livroId);
        if (livro == null) {
            return null;
        }
        if (usuarioRepository.findById(usuarioId) == null) {
            return null;
        }
        if (livro.getQuantidade() <= 0) {
            return null;
        }
        if (usuarioLivroRepository.existsByUsuarioIdAndLivroId(usuarioId, livroId)) {
            return null;
        }
        usuarioLivroRepository.emprestar(usuarioId, livroId);
        livroRepository.atualizarQuantidade(livroId, -1);
        return livroRepository.findById(livroId);
    }

    public Livro devolver(Integer livroId, Integer usuarioId) {
        Livro livro = livroRepository.findById(livroId);
        if (livro == null) {
            return null;
        }
        if (usuarioRepository.findById(usuarioId) == null) {
            return null;
        }
        if (!usuarioLivroRepository.existsByUsuarioIdAndLivroId(usuarioId, livroId)) {
            return null;
        }
        int rows = usuarioLivroRepository.devolver(usuarioId, livroId);
        if (rows == 0) {
            return null;
        }
        livroRepository.atualizarQuantidade(livroId, 1);
        return livroRepository.findById(livroId);
    }

    public List<Livro> listarPorUsuario(Integer usuarioId) {
        if (usuarioRepository.findById(usuarioId) == null) {
            return List.of();
        }
        return usuarioLivroRepository.findLivrosByUsuarioId(usuarioId);
    }
}
