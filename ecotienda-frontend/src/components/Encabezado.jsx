"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Encabezado() {
  const pathname = usePathname();

  return (
    <header className="encabezado">
      <h1>ByteCentral</h1>
      <p>
        Tecnología eficiente para proteger tu bolsillo frente a la crisis
        energética de El Niño.
      </p>

      <nav className="menu">
        <Link href="/" className={pathname === "/" ? "activo" : ""}>
          Inicio
        </Link>
        <Link
          href="/catalogo"
          className={pathname === "/catalogo" ? "activo" : ""}
        >
          Catálogo
        </Link>
        <Link href="/admin" className={pathname === "/admin" ? "activo" : ""}>
          Administración
        </Link>
      </nav>
    </header>
  );
}