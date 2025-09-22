import { notFound } from "next/navigation";
import { pokeApi } from "@/services/pokeapi";
import PokemonDetail from "@/components/PokemonDetail";

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const pokemonList = await pokeApi.getAllPokemon();

  return pokemonList.results.map((pokemon) => ({
    id: pokemon.url.split("/").slice(-2, -1)[0],
  }));
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = params;

  try {
    const completeInfo = await pokeApi.getCompletePokemonInfo(id);
    return <PokemonDetail pokemonInfo={completeInfo} />;
  } catch (error) {
    console.error("Error loading Pokemon:", error);
    notFound();
  }
}
