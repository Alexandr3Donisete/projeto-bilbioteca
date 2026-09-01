package school.sptech.projeto_biblioteca.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import school.sptech.projeto_biblioteca.model.Usuario;
import school.sptech.projeto_biblioteca.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        if (!dataIsValid(usuario)) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(201).body(usuarioRepository.save(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario usuario) {
        if (usuario.getEmail() == null || usuario.getSenha() == null) {
            return ResponseEntity.status(400).build();
        }
        Usuario encontrado = usuarioRepository.findByEmailAndSenha(usuario.getEmail(), usuario.getSenha());
        if (encontrado == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.status(200).body(encontrado);
    }

    private boolean dataIsValid(Usuario usuario) {
        return usuario != null
                && usuario.getNome() != null && !usuario.getNome().isBlank()
                && usuario.getEmail() != null && !usuario.getEmail().isBlank()
                && usuario.getSenha() != null && !usuario.getSenha().isBlank();
    }
}
