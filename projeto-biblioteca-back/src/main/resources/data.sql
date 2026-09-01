INSERT INTO usuario (nome, email, senha) VALUES
    ('Ana Souza', 'ana@email.com', '1234'),
    ('Bruno Lima', 'bruno@email.com', '5678'),
    ('Administrador', 'admin@email.com', 'p0o9i8u7');

INSERT INTO livro (titulo, ano_publicacao, genero, quantidade, autor, usuario_id) VALUES
    ('Dom Casmurro', 1899, 'Romance', 3, 'Machado de Assis', 1),
    ('1984', 1949, 'Distopia', 2, 'George Orwell', 1),
    ('Harry Potter e a Pedra Filosofal', 1997, 'Fantasia', 4, 'J.K. Rowling', NULL);
