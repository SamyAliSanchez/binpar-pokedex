"use client";

import { useState, useEffect, useMemo } from "react";
import { pokeApi } from "@/services/pokeapi";
import { Pokemon } from "@/types/pokemon";
import PokemonCard from "./PokemonCard";
import SearchAndFilters from "./SearchAndFilters";
import { usePokemonListState } from "@/context/PokemonListContext";

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState<
    Array<Pokemon & { generation: string; evolutionGroup: string[] }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state, updateState } = usePokemonListState();

  const [visibleCount, setVisibleCount] = useState(20);
  const LOAD_MORE_COUNT = 20;
  const THRESHOLD = 500;

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const pokemonList = await pokeApi.getAllPokemon(1000);
        const limitedList = pokemonList.results.slice(0, 1000);

        const pokemonPromises = limitedList.map(async (pokemonItem) => {
          try {
            const pokemon = await pokeApi.getPokemon(pokemonItem.name);
            const generation = pokeApi.getGenerationFromId(pokemon.id);

            const species = await pokeApi.getPokemonSpecies(pokemon.id);
            let evolutionGroup: string[] = [];
            if (species.evolution_chain?.url) {
              const evolutionChain = await pokeApi.getEvolutionChain(
                parseInt(
                  species.evolution_chain.url.split("/").slice(-2, -1)[0]
                )
              );
              evolutionGroup = pokeApi.getEvolutionNames(evolutionChain.chain);
            }

            return { ...pokemon, generation, evolutionGroup };
          } catch (error) {
            console.error(`Error loading Pokemon ${pokemonItem.name}:`, error);
            return null;
          }
        });

        const pokemonResults = await Promise.all(pokemonPromises);
        const validPokemon = pokemonResults.filter(
          (
            pokemon
          ): pokemon is Pokemon & {
            generation: string;
            evolutionGroup: string[];
          } => pokemon !== null
        );

        setPokemonData(validPokemon);
      } catch (error) {
        console.error("Error loading Pokemon data:", error);
        setError("Error al cargar los datos de Pokémon");
      } finally {
        setLoading(false);
      }
    };

    loadPokemonData();
  }, []);

  const filteredPokemon = useMemo(() => {
    let filtered = pokemonData;

    if (state.selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === state.selectedType)
      );
    }

    if (state.selectedGeneration) {
      filtered = filtered.filter(
        (pokemon) => pokemon.generation === state.selectedGeneration
      );
    }

    if (state.search) {
      const searchTerm = state.search.toLowerCase();
      filtered = filtered.filter((pokemon) => {
        if (pokemon.name.toLowerCase().includes(searchTerm)) return true;
        if (
          pokemon.evolutionGroup?.some((evo) =>
            evo.toLowerCase().includes(searchTerm)
          )
        )
          return true;
        return false;
      });
    }

    return filtered;
  }, [pokemonData, state]);

  const displayedPokemon = filteredPokemon.slice(0, visibleCount);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - THRESHOLD &&
        visibleCount < filteredPokemon.length
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, filteredPokemon.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, filteredPokemon.length]);

  const handleSearchChange = (search: string) => {
    updateState({ search });
    setVisibleCount(20);
  };
  const handleTypeFilter = (selectedType: string) => {
    updateState({ selectedType });
    setVisibleCount(20);
  };
  const handleGenerationFilter = (selectedGeneration: string) => {
    updateState({ selectedGeneration });
    setVisibleCount(20);
  };

  if (loading)
    return <div className="text-center py-12">Cargando Pokémon...</div>;
  if (error)
    return (
      <div className="text-center py-12">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Pokédex</h1>
        <p className="text-gray-600">
          Descubre información sobre todos los Pokémon
        </p>
      </div>

      <SearchAndFilters
        onSearchChange={handleSearchChange}
        onTypeFilter={handleTypeFilter}
        onGenerationFilter={handleGenerationFilter}
        searchValue={state.search}
        selectedType={state.selectedType}
        selectedGeneration={state.selectedGeneration}
      />

      <div className="mb-4">
        <p className="text-gray-600">
          Mostrando {displayedPokemon.length} de {filteredPokemon.length}{" "}
          Pokémon
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            generation={pokemon.generation}
          />
        ))}
      </div>

      {displayedPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No se encontraron Pokémon con los filtros aplicados
          </p>
          <button
            onClick={() => {
              updateState({
                search: "",
                selectedType: "",
                selectedGeneration: "",
              });
              setVisibleCount(20);
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
