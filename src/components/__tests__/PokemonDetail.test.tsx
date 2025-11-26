import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonDetail from "../PokemonDetail";
import { pokeApi } from "@/services/pokeapi";
import { EvolutionChain, Pokemon, PokemonSpecies } from "@/types/pokemon";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/services/pokeapi", () => ({
  pokeApi: {
    getEvolutionNames: jest.fn(),
    getPokemon: jest.fn(),
  },
}));

const mockedPokeApi = pokeApi as jest.Mocked<typeof pokeApi>;

const samplePokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: {
    front_default: "/pikachu.png",
    front_shiny: "/pikachu-shiny.png",
    other: {
      "official-artwork": {
        front_default: "/pikachu-art.png",
        front_shiny: "/pikachu-art-shiny.png",
      },
    },
  },
  types: [
    {
      slot: 1,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    },
  ],
  stats: [
    {
      base_stat: 90,
      effort: 2,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
  ],
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
};

const sampleSpecies: PokemonSpecies = {
  id: 25,
  name: "pikachu",
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/10/",
  },
  flavor_text_entries: [],
};

const sampleEvolution: EvolutionChain = {
  id: 10,
  chain: {
    is_baby: false,
    species: {
      name: "pichu",
      url: "https://pokeapi.co/api/v2/pokemon-species/172/",
    },
    evolution_details: [],
    evolves_to: [],
  },
};

describe("PokemonDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the basic pokemon info, stats and type badges", async () => {
    mockedPokeApi.getEvolutionNames.mockReturnValue([]);
    mockedPokeApi.getPokemon.mockResolvedValue(samplePokemon);

    render(
      <PokemonDetail
        pokemonInfo={{
          pokemon: samplePokemon,
          species: sampleSpecies,
          evolutionChain: sampleEvolution,
        }}
      />
    );

    expect(
      await screen.findByRole("heading", { name: "Pikachu" })
    ).toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("Generación I")).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
    expect(screen.getByText("Estadísticas")).toBeInTheDocument();
    expect(screen.getByText("Speed")).toBeInTheDocument();
    expect(screen.getByText("Attack")).toBeInTheDocument();
  });
});
