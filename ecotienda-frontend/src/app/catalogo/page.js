"use client";

import { useEffect, useState } from "react";
import { obtenerProductos, crearPedido } from "@/lib/api";
import TarjetaProducto from "@/components/TarjetaProducto";
import Carrito from "@/components/Carrito";

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [mensajePedido, setMensajePedido] = useState("");
  const [cliente, setCliente] = useState("");

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

  const categorias = ["Todas", ...new Set(productos.map((p) => p.categoria))];

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

  function cambiarCantidad(id, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(nuevaCantidad, item.stock) }
          : item
      )
    );
  }

  function quitarDelCarrito(id) {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }

async function finalizarCompra() {
  if (carrito.length === 0) return;
  if (!cliente.trim()) {
    setMensajePedido("Por favor escribe el nombre del cliente.");
    return;
  }

  try {
    await crearPedido({
      cliente: cliente.trim(),
      productos: carrito.map((item) => ({
        id: item.id,
        cantidad: item.cantidad,
      })),
    });

    setCarrito([]);
    setCliente("");
    setMensajePedido("¡Pedido registrado con éxito en ByteCentral!");
    cargarProductos();
  } catch (err) {
    setMensajePedido(err.message || "Error al registrar el pedido.");
  }
}

  return (
    <main style={{ padding: "20px 0" }}>
      <section className="tarjeta" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#0352f1", marginBottom: "8px" }}>
          Catálogo de Productos ByteCentral
        </h2>
        <p style={{ color: "#fdfafa", marginBottom: "16px" }}>
          Selecciona equipos y artículos sostenibles conectados en tiempo real con nuestra API.
        </p>

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {productosFiltrados.map((prod) => (
            <TarjetaProducto
              key={prod.id}
              producto={prod}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </div>

        <Carrito
          items={carrito}
          cliente={cliente}
          onCambiarCliente={setCliente}
          onCambiarCantidad={cambiarCantidad}
          onQuitar={quitarDelCarrito}
          onConfirmar={finalizarCompra}
          mensajePedido={mensajePedido}
        />
      </div>
    </main>
  );
}