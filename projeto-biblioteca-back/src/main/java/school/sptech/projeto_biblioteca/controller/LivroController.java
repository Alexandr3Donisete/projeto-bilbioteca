package school.sptech.projeto_biblioteca.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.sptech.projeto_biblioteca.model.Livro;
import school.sptech.projeto_biblioteca.repository.LivroRepository;
import school.sptech.projeto_biblioteca.service.LivroService;

import java.util.List;

@RestController
@RequestMapping("/livros")
@CrossOrigin(origins = "*")
public class LivroController {

    private final LivroRepository livroRepository;
    private final LivroService livroService;

    public LivroController(LivroRepository livroRepository, LivroService livroService) {
        this.livroRepository = livroRepository;
        this.livroService = livroService;
    }

    @GetMapping
    public ResponseEntity<List<Livro>> listarTodos() {
        return ResponseEntity.status(200).body(livroRepository.findAll());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Livro>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.status(200).body(livroService.listarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Livro livro) {
        if (!dataIsValid(livro)) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(201).body(livroRepository.save(livro));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Integer id, @RequestBody Livro livro) {
        if (!dataIsValid(livro)) {
            return ResponseEntity.status(400).build();
        }
        if (livroRepository.findById(id) == null) {
            return ResponseEntity.status(404).build();
        }
        livro.setId(id);
        return ResponseEntity.status(200).body(livroRepository.save(livro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        if (livroRepository.findById(id) == null) {
            return ResponseEntity.status(404).build();
        }
        livroRepository.deleteById(id);
        return ResponseEntity.status(204).build();
    }

    @PostMapping("/{id}/emprestar")
    public ResponseEntity<Void> emprestar(@PathVariable Integer id, @RequestParam Integer usuarioId) {
        Livro livro = livroService.emprestar(id, usuarioId);
        if (livro == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/{id}/devolver")
    public ResponseEntity<Void> devolver(@PathVariable Integer id, @RequestParam Integer usuarioId) {
        Livro livro = livroService.devolver(id, usuarioId);
        if (livro == null) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.status(200).build();
    }

    private boolean dataIsValid(Livro livro) {
        return livro != null
                && livro.getTitulo() != null && !livro.getTitulo().isBlank()
                && livro.getAnoPublicacao() != null && livro.getAnoPublicacao() > 0
                && livro.getGenero() != null && !livro.getGenero().isBlank()
                && livro.getQuantidade() != null && livro.getQuantidade() >= 0
                && livro.getAutor() != null && !livro.getAutor().isBlank();
    }
}
