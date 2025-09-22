"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Pokemon error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">¡Oh no!</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Error al cargar el Pokémon
        </h2>
        <p className="text-gray-500 mb-8">
          No pudimos cargar la información del Pokémon solicitado
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-block"
          >
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}
