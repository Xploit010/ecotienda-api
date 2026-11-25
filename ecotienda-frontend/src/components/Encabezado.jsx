"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Encabezado() {
  const pathname = usePathname();

  const estiloBoton = (ruta) => {
    const esActivo = pathname === ruta;
    return {
      padding: "10px 22px",
      borderRadius: "999px",
      textDecoration: "none",
      fontWeight: esActivo ? "700" : "500",
      fontSize: "0.95rem",
      color: "#ffffff",
      background: esActivo
        ? "linear-gradient(135deg, #10b981, #059669)"
        : "rgba(255, 255, 255, 0.08)",
      border: esActivo
        ? "1px solid #34d399"
        : "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: esActivo ? "0 4px 15px rgba(16, 185, 129, 0.4)" : "none",
      transition: "all 0.25s ease",
      display: "inline-block",
    };
  };

  return (
    <header
      className="encabezado"
      style={{
        background:
          "linear-gradient(135deg, rgba(10, 18, 36, 0.72), rgba(15, 35, 70, 0.62))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        borderRadius: "20px",
        padding: "36px 40px",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
        color: "#ffffff",
      }}
    >
      {/* Distintivo superior de marca */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(16, 185, 129, 0.18)",
          border: "1px solid rgba(52, 211, 153, 0.4)",
          color: "#6ee7b7",
          padding: "4px 14px",
          borderRadius: "999px",
          fontSize: "0.78rem",
          fontWeight: "700",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        <span>⚡</span> Eficiencia Energética Inteligente
      </div>

      {/* Título principal con degradado luminoso */}
      <h1
        style={{
          margin: "0 0 8px 0",
          fontSize: "2.4rem",
          fontWeight: "800",
          letterSpacing: "-0.02em",
          background: "linear-gradient(to right, #ffffff, #93c5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ByteCentral
      </h1>

      <p
        style={{
          margin: "0 0 24px 0",
          color: "#cbd5e1",
          fontSize: "1.02rem",
          maxWidth: "650px",
        }}
      >
        Tecnología eficiente para proteger tu bolsillo frente a la crisis
        energética de El Niño.
      </p>

      <nav
        className="menu"
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          className={pathname === "/" ? "activo" : ""}
          style={estiloBoton("/")}
        >
          Inicio
        </Link>
        <Link
          href="/catalogo"
          className={pathname === "/catalogo" ? "activo" : ""}
          style={estiloBoton("/catalogo")}
        >
          Catálogo
        </Link>
        <Link
          href="/admin"
          className={pathname === "/admin" ? "activo" : ""}
          style={estiloBoton("/admin")}
        >
          Administración
        </Link>
      </nav>
    </header>
  );
}