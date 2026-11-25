# ByteCentral — Plataforma Web de Eficiencia Energética y Tecnología

Aplicación web full-stack desarrollada para la gestión, visualización y compra de soluciones tecnológicas enfocadas en eficiencia energética (`Iluminacion`, `Electrodomesticos` y `Solar`).

---

## 1. Estructura del Repositorio

El proyecto está organizado en dos módulos principales dentro de la raíz del repositorio:

```text
bytecentral/
├── api/          # Backend: API REST monolítica en Node.js con Express y SQLite
├── front/        # Frontend: Aplicación web en Next.js con React (exportación estática)
└── README.md     # Documentación general, instalación y ejecución
```

---

## 2. Requisitos Previos

* **Node.js** (v18 o superior)
* **npm** (incluido con Node.js)

---

## 3. Instalación y Ejecución Paso a Paso

Para levantar la aplicación completa se requieren **dos terminales** ejecutándose en paralelo (una para el backend y otra para el frontend).

### Paso 1: Configurar y levantar el Backend (`api/`)

1. En la primera terminal, ingresa al directorio del backend:
   ```bash
   cd api
   ```
2. Instala las dependencias del servidor:
   ```bash
   npm install
   ```
3. Inicializa y pobla la base de datos SQLite (`tienda.sql`) con el catálogo inicial de **ByteCentral** (9 productos distribuidos en `Iluminacion`, `Electrodomesticos` y `Solar`):
   ```bash
   npm run crear-bd
   ```
   *(Nota: Si el servidor de la API ya estaba encendido, detenlo con `Ctrl + C` antes de ejecutar `npm run crear-bd` para evitar bloqueo del archivo de base de datos).*
4. Inicia el servidor de la API:
   ```bash
   npm run dev
   ```
   * El backend quedará activo en **`http://localhost:3002`**.
   * Verificación rápida de productos: `http://localhost:3002/api/productos`.

### Paso 2: Configurar y levantar el Frontend (`front/`)

1. Abre una segunda terminal e ingresa al directorio del frontend:
   ```bash
   cd front
   ```
2. Instala las dependencias de Next.js y React:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
   * La interfaz web quedará disponible en **`http://localhost:3000/`**.
