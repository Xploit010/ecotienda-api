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
  ('Cinta LED Inteligente WiFi 5m RGBW', 'Iluminacion', 54000, 68000, 30),
  ('Lampara Solar Exterior con Sensor PIR 100W', 'Iluminacion', 79000, 95000, 22),
  ('Tubo LED T8 18W Luz Dia 120cm', 'Iluminacion', 16500, 16500, 45),
  ('Lavadora Carga Frontal Inverter 12kg', 'Electrodomesticos', 1950000, 2290000, 8),
  ('Enchufe Inteligente WiFi con Medidor Consumo', 'Electrodomesticos', 42000, 55000, 35),
  ('Horno Microondas Digital Eco-Save 20L', 'Electrodomesticos', 380000, 380000, 14),
  ('Inversor Solar Hibrido Onda Pura 3000W', 'Solar', 1650000, 1890000, 10),
  ('Bateria de Litio LiFePO4 12V 100Ah', 'Solar', 1420000, 1600000, 12),
  ('Controlador de Carga Solar MPPT 40A', 'Solar', 320000, 320000, 18);