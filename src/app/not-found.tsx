import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Pokémon no encontrado
          </h2>
          <p className="text-gray-500 mb-8">
            El Pokémon que buscas no existe o ha sido movido a otra región.
          </p>
        </div>

        <div className="space-x-4">
          <Link
            href="/"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Volver al Pokédex
          </Link>

          <Link
            href="/"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Explorar Pokémon
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <p>💡 Tip: Verifica que el nombre o ID del Pokémon sea correcto</p>
        </div>
      </div>
    </div>
  );
}
