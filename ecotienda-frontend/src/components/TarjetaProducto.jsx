"use client";

export default function TarjetaProducto({ producto, onAgregar }) {
  const tieneDescuento = producto.precio_anterior > producto.precio;

  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <article
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
          {producto.categoria}
        </span>

        <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
          {producto.nombre}
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
            Antes: {formatoCOP(producto.precio_anterior)}
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
          {formatoCOP(producto.precio)}
        </p>

        <p style={{ fontSize: "0.85rem", color: "#555" }}>
          Disponibles: <strong>{producto.stock}</strong> unidades
        </p>
      </div>

      <button
        onClick={() => onAgregar(producto)}
        disabled={producto.stock <= 0}
        className="boton-primario"
        style={{
          marginTop: "12px",
          width: "100%",
          opacity: producto.stock <= 0 ? 0.5 : 1,
          cursor: producto.stock <= 0 ? "not-allowed" : "pointer",
        }}
      >
        {producto.stock > 0 ? "Agregar al carrito" : "Agotado"}
      </button>
    </article>
  );
}