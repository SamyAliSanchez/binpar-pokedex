import {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonListResponse,
  Generation,
  Type,
} from "@/types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

const endpoints = {
  pokemon: (idOrName: string | number) =>
    `${POKEAPI_BASE_URL}/pokemon/${idOrName}`,
  species: (idOrName: string | number) =>
    `${POKEAPI_BASE_URL}/pokemon-species/${idOrName}`,
  evolution: (id: number) => `${POKEAPI_BASE_URL}/evolution-chain/${id}`,
  generation: `${POKEAPI_BASE_URL}/generation`,
  type: `${POKEAPI_BASE_URL}/type`,
  allPokemon: (limit = 1300, offset = 0) =>
    `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
};

const cache = new Map<string, unknown>();

async function fetchFromAPI<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching ${url}: ${res.status}`);

  const data = (await res.json()) as T;
  cache.set(url, data);
  return data;
}

export const pokeApi = {
  getAllPokemon: (limit = 1300, offset = 0) =>
    fetchFromAPI<PokemonListResponse>(endpoints.allPokemon(limit, offset)),

  getPokemon: (idOrName: string | number) =>
    fetchFromAPI<Pokemon>(endpoints.pokemon(idOrName)),

  getPokemonSpecies: (idOrName: string | number) =>
    fetchFromAPI<PokemonSpecies>(endpoints.species(idOrName)),

  getEvolutionChain: (id: number) =>
    fetchFromAPI<EvolutionChain>(endpoints.evolution(id)),

  getGenerations: async (): Promise<Generation[]> => {
    const response = await fetchFromAPI<{
      results: Array<{ name: string; url: string }>;
    }>(endpoints.generation);

    return Promise.all(
      response.results.map((gen) => fetchFromAPI<Generation>(gen.url))
    );
  },

  getTypes: async (): Promise<Type[]> => {
    const response = await fetchFromAPI<{
      results: Array<{ name: string; url: string }>;
    }>(endpoints.type);

    return Promise.all(
      response.results.map((type) => fetchFromAPI<Type>(type.url))
    );
  },

  getCompletePokemonInfo: async (idOrName: string | number) => {
    const [pokemon, species] = await Promise.all([
      pokeApi.getPokemon(idOrName),
      pokeApi.getPokemonSpecies(idOrName),
    ]);

    let evolutionChain: EvolutionChain | undefined;
    if (species.evolution_chain?.url) {
      evolutionChain = await fetchFromAPI<EvolutionChain>(
        species.evolution_chain.url
      );
    }

    return { pokemon, species, evolutionChain };
  },

  getGenerationFromId: (id: number): string => {
    const gens = [
      { max: 151, gen: "generation-i" },
      { max: 251, gen: "generation-ii" },
      { max: 386, gen: "generation-iii" },
      { max: 493, gen: "generation-iv" },
      { max: 649, gen: "generation-v" },
      { max: 721, gen: "generation-vi" },
      { max: 809, gen: "generation-vii" },
      { max: 905, gen: "generation-viii" },
      { max: 1025, gen: "generation-ix" },
    ];

    return gens.find((g) => id <= g.max)?.gen ?? "generation-x";
  },

  getEvolutionNames: (chain: EvolutionChain["chain"]): string[] => {
    const names = [chain.species.name];
    chain.evolves_to.forEach((evolution) => {
      names.push(...pokeApi.getEvolutionNames(evolution));
    });
    return names;
  },
};
