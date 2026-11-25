DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL,
  precio REAL NOT NULL,
  precio_anterior REAL DEFAULT 0,
  stock INTEGER NOT NULL
);

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente TEXT NOT NULL,
  fecha TEXT NOT NULL,
  total REAL NOT NULL,
  productos TEXT NOT NULL
);

INSERT INTO productos (nombre, categoria, precio, precio_anterior, stock) VALUES
  ('Botella Termica Acero Inoxidable', 'Hogar', 45000, 58000, 20),
  ('Bolsa Reutilizable Algodon Organico', 'Hogar', 18000, 24000, 35),
  ('Set Pitillos Bambu Ecologicos', 'Hogar', 15000, 15000, 40),
  ('Cepillo Dental de Bambu', 'Cuidado Personal', 12000, 16000, 50),
  ('Jabon Artesanal de Avena y Miel', 'Cuidado Personal', 14000, 18000, 25),
  ('Champu Solido Natural Romero', 'Cuidado Personal', 28000, 35000, 18),
  ('Cafe Organico Sierra Nevada 500g', 'Alimentos', 32000, 38000, 15),
  ('Miel Pura de Abejas 350g', 'Alimentos', 25000, 25000, 22),
  ('Granola Artesanal Sin Azucar 400g', 'Alimentos', 21000, 26000, 19);