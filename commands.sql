CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO
    blogs (author, url, title, likes)
VALUES 
    ('mina', 'esimerkki.blogi.net', 'esimerkkiblogi', 17);

INSERT INTO
    blogs (url, title)
VALUES
    ('example.blog.net', 'exampleBlog');
