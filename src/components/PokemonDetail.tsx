"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { pokeApi } from "@/services/pokeapi";
import { Pokemon, PokemonSpecies, EvolutionChain } from "@/types/pokemon";

interface PokemonDetailProps {
  pokemonInfo: {
    pokemon: Pokemon;
    species: PokemonSpecies;
    evolutionChain?: EvolutionChain;
  };
}

export default function PokemonDetail({ pokemonInfo }: PokemonDetailProps) {
  const { pokemon, species, evolutionChain } = pokemonInfo;
  const [evolutionPokemon, setEvolutionPokemon] = useState<Pokemon[]>([]);
  const [loadingEvolutions, setLoadingEvolutions] = useState(true);

  useEffect(() => {
    const loadEvolutions = async () => {
      if (!evolutionChain) {
        setLoadingEvolutions(false);
        return;
      }

      try {
        const evolutionNames = pokeApi.getEvolutionNames(evolutionChain.chain);
        const evolutionPromises = evolutionNames.map((name) =>
          pokeApi.getPokemon(name).catch(() => null)
        );

        const evolutions = await Promise.all(evolutionPromises);
        const validEvolutions = evolutions.filter(
          (evo): evo is Pokemon => evo !== null
        );

        setEvolutionPokemon(validEvolutions);
      } catch (error) {
        console.error("Error loading evolutions:", error);
      } finally {
        setLoadingEvolutions(false);
      }
    };

    loadEvolutions();
  }, [evolutionChain, pokeApi.getEvolutionNames]);

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  const formatStatName = (statName: string) => {
    const statNames: Record<string, string> = {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Attack",
      "special-defense": "Sp. Defense",
      speed: "Speed",
    };
    return statNames[statName] || statName;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      normal: "bg-gray-400",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-200",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-blue-300",
      psychic: "bg-pink-500",
      bug: "bg-green-400",
      rock: "bg-yellow-700",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-600",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };
    return colors[type] || "bg-gray-400";
  };

  const getStatColor = (stat: number) => {
    if (stat >= 100) return "bg-green-500";
    if (stat >= 80) return "bg-yellow-500";
    if (stat >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "/placeholder-pokemon.png";

  const generationName = species.generation.name
    .replace("generation-", "")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Volver al listado
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {formatName(pokemon.name)}
                </h1>
                <p className="text-lg opacity-90">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
                <p className="text-sm opacity-75">
                  Generación {generationName}
                </p>
              </div>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-2 rounded-full text-sm font-medium text-white ${getTypeColor(
                      type.type.name
                    )}`}
                  >
                    {formatName(type.type.name)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="text-center">
                  <Image
                    src={imageUrl}
                    alt={pokemon.name}
                    width={300}
                    height={300}
                    className="mx-auto object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Estadísticas
                  </h3>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="flex items-center">
                        <div className="w-24 text-sm font-medium text-gray-600">
                          {formatStatName(stat.stat.name)}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getStatColor(
                                stat.base_stat
                              )}`}
                              style={{
                                width: `${Math.min(
                                  (stat.base_stat / 150) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-sm font-medium text-right text-gray-800">
                          {stat.base_stat}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Evoluciones
                  </h3>
                  {loadingEvolutions ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-sm text-gray-600 mt-2">
                        Cargando evoluciones...
                      </p>
                    </div>
                  ) : evolutionPokemon.length > 1 ? (
                    <div className="flex flex-wrap gap-4">
                      {evolutionPokemon.map((evo) => (
                        <Link
                          key={evo.id}
                          href={`/pokemon/${evo.id}`}
                          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                            evo.id === pokemon.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={
                              evo.sprites.other["official-artwork"]
                                .front_default ||
                              evo.sprites.front_default ||
                              "/placeholder-pokemon.png"
                            }
                            alt={evo.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                          <span
                            className={`text-sm font-medium mt-2 ${
                              evo.id === pokemon.id
                                ? "text-blue-600"
                                : "text-gray-700"
                            }`}
                          >
                            {formatName(evo.name)}
                          </span>
                          {evo.id === pokemon.id}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">
                      Este Pokémon no tiene evoluciones conocidas
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
