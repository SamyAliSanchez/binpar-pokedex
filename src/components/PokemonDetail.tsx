interface PokemonDetailProps {
  pokemonInfo: {
    pokemon: Pokemon;
    species: PokemonSpecies;
    evolutionChain: EvolutionChain | null;
  };
}

export default function PokemonDetail({ pokemonInfo }: PokemonDetailProps) {
  const { pokemon } = pokemonInfo;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Información básica</h2>
            <p>
              <strong>ID:</strong> #{pokemon.id.toString().padStart(3, "0")}
            </p>
            <p>
              <strong>Altura:</strong> {pokemon.height / 10}m
            </p>
            <p>
              <strong>Peso:</strong> {pokemon.weight / 10}kg
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Tipos</h2>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`px-3 py-1 rounded-full text-white text-sm bg-${type.type.name}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6"></div>
      </div>
    </div>
  );
}
