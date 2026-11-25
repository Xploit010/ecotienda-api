"use client";

import { useEffect, useState } from "react";
import { obtenerProductos, crearPedido } from "@/lib/api";

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [mensajePedido, setMensajePedido] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      setProductos(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("No se pudo conectar con la API en el puerto 3002.");
    } finally {
      setCargando(false);
    }
  }

  // Obtener categorías únicas dinámicamente
  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

  // Filtrar por búsqueda y categoría
  const productosFiltrados = productos.filter((prod) => {
    const coincideNombre = prod.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaActiva === "Todas" || prod.categoria === categoriaActiva;
    return coincideNombre && coincideCategoria;
  });

  function agregarAlCarrito(producto) {
    setMensajePedido("");
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        if (existe.cantidad >= producto.stock) return prev;
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  async function finalizarCompra() {
    if (carrito.length === 0) return;
    try {
      await crearPedido({
        items: carrito.map((item) => ({
          producto_id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
        total: totalCarrito,
      });
      setCarrito([]);
      setMensajePedido("¡Pedido registrado con éxito en ByteCentral!");
      cargarProductos(); // Refresca el stock si el backend lo descuenta
    } catch (err) {
      setMensajePedido("Compra procesada localmente (verifica el formato de /api/pedidos).");
      setCarrito([]);
    }
  }

  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <main style={{ padding: "20px 0" }}>
      <section className="tarjeta" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#0352f1", marginBottom: "8px" }}>
          Catálogo de Productos ByteCentral
        </h2>
        <p style={{ color: "#555", marginBottom: "16px" }}>
          Selecciona equipos y artículos sostenibles conectados en tiempo real con nuestra API.
        </p>

        {/* Buscador y filtros */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Buscar producto por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              flex: "1 1 250px",
            }}
          />

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "1px solid #0352f1",
                  backgroundColor:
                    categoriaActiva === cat ? "#0352f1" : "white",
                  color: categoriaActiva === cat ? "white" : "#0352f1",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {cargando && <p>Cargando productos desde el servidor...</p>}
      {error && (
        <p style={{ color: "crimson", fontWeight: "bold" }}>{error}</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Cuadrícula de productos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {productosFiltrados.map((prod) => {
            const tieneDescuento = prod.precio_anterior > prod.precio;
            return (
              <article
                key={prod.id}
                className="tarjeta"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      backgroundColor: "#e8f0fe",
                      color: "#0352f1",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {prod.categoria}
                  </span>

                  <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                    {prod.nombre}
                  </h3>

                  {tieneDescuento && (
                    <p
                      style={{
                        textDecoration: "line-through",
                        color: "#888",
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      Antes: {formatoCOP(prod.precio_anterior)}
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#0352f1",
                      margin: "4px 0",
                    }}
                  >
                    {formatoCOP(prod.precio)}
                  </p>

                  <p style={{ fontSize: "0.85rem", color: "#555" }}>
                    Disponibles: <strong>{prod.stock}</strong> unidades
                  </p>
                </div>

                <button
                  onClick={() => agregarAlCarrito(prod)}
                  disabled={prod.stock <= 0}
                  className="boton-primario"
                  style={{
                    marginTop: "12px",
                    width: "100%",
                    opacity: prod.stock <= 0 ? 0.5 : 1,
                    cursor: prod.stock <= 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {prod.stock > 0 ? "Agregar al carrito" : "Agotado"}
                </button>
              </article>
            );
          })}
        </div>

        {/* Panel del Carrito */}
        <aside className="tarjeta">
          <h3 style={{ color: "#0352f1", marginBottom: "12px" }}>
            Carrito ({carrito.reduce((sum, i) => sum + i.cantidad, 0)})
          </h3>

          {mensajePedido && (
            <p
              style={{
                backgroundColor: "#e6f4ea",
                color: "#137333",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                marginBottom: "12px",
              }}
            >
              {mensajePedido}
            </p>
          )}

          {carrito.length === 0 ? (
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              Aún no has agregado productos.
            </p>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #eee",
                      padding: "8px 0",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.9rem" }}>
                        {item.nombre}
                      </strong>
                      <div style={{ fontSize: "0.85rem", color: "#555" }}>
                        {item.cantidad} x {formatoCOP(item.precio)}
                      </div>
                    </div>
                    <button
                      onClick={() => quitarDelCarrito(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "crimson",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      title="Eliminar"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "2px solid #0352f1",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  <span>Total:</span>
                  <span>{formatoCOP(totalCarrito)}</span>
                </p>

                <button
                  onClick={finalizarCompra}
                  className="boton-primario"
                  style={{ width: "100%", marginTop: "8px" }}
                >
                  Confirmar pedido
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}