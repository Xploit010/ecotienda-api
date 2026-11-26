"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoFondo() {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [activo, setActivo] = useState("A");
  const cruzandoRef = useRef(false);

  useEffect(() => {
    const vidA = videoARef.current;
    const vidB = videoBRef.current;
    if (!vidA || !vidB) return;

    vidA.play().catch(() => {});

    const vigilarCruce = () => {
      const actual = activo === "A" ? vidA : vidB;
      const siguiente = activo === "A" ? vidB : vidA;

      if (!actual.duration || cruzandoRef.current) return;

      // 1.2 segundos antes de terminar, arranca el segundo video por debajo y hace el cruce
      if (actual.duration - actual.currentTime <= 1.2) {
        cruzandoRef.current = true;
        siguiente.currentTime = 0;
        siguiente.play().catch(() => {});
        setActivo(activo === "A" ? "B" : "A");

        setTimeout(() => {
          actual.pause();
          actual.currentTime = 0;
          cruzandoRef.current = false;
        }, 1250);
      }
    };

    const intervalo = setInterval(vigilarCruce, 100);
    return () => clearInterval(intervalo);
  }, [activo]);

  const estiloBase = (esVisible) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    opacity: esVisible ? 1 : 0,
    transition: "opacity 1.1s linear",
    pointerEvents: "none",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <video
        ref={videoARef}
        src="/fondo.mp4"
        muted
        playsInline
        preload="auto"
        style={estiloBase(activo === "A")}
      />
      <video
        ref={videoBRef}
        src="/fondo.mp4"
        muted
        playsInline
        preload="auto"
        style={estiloBase(activo === "B")}
      />
    </div>
  );
}