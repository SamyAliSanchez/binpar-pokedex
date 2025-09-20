export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: Array<{
    slot: number;
    type: PokemonType;
  }>;
  stats: PokemonStat[];
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  generation: {
    name: string;
    url: string;
  };
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionDetail;
}

export interface EvolutionDetail {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    min_level: number;
    trigger: {
      name: string;
      url: string;
    };
  }>;
  evolves_to: EvolutionDetail[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface Generation {
  id: number;
  name: string;
  pokemon_species: Array<{
    name: string;
    url: string;
  }>;
}

export interface Type {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }>;
}
