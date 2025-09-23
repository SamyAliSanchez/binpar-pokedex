"use client";

import { Pokemon } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon & { generation: string };
  generation: string;
}

export default function PokemonCard({ pokemon, generation }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name || "unknown";

  const cardColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-gray-600",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
    unknown: "bg-gray-300",
  };

  const typeColors: Record<string, string> = {
    normal: "bg-gray-600",
    fire: "bg-orange-400",
    water: "bg-cyan-400",
    electric: "bg-amber-300",
    grass: "bg-lime-400",
    ice: "bg-sky-300",
    fighting: "bg-red-600",
    poison: "bg-violet-400",
    ground: "bg-amber-600",
    flying: "bg-slate-400",
    psychic: "bg-rose-400",
    bug: "bg-emerald-400",
    rock: "bg-stone-500",
    ghost: "bg-indigo-500",
    dragon: "bg-purple-500",
    dark: "bg-gray-700",
    steel: "bg-zinc-400",
    fairy: "bg-pink-200",
    unknown: "bg-gray-500",
  };

  const cardColor = cardColors[primaryType] || "bg-gray-300";

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={`${cardColor} rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`}
      >
        <div className="relative h-48 bg-white bg-opacity-20 rounded-t-lg">
          <Image
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default ||
              "/placeholder-pokemon.png"
            }
            alt={pokemon.name}
            fill
            className="object-contain p-4"
            priority={false}
          />
        </div>

        <div className="p-4 text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold opacity-80">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
            <span className="text-sm font-semibold opacity-80 capitalize">
              {generation}
            </span>
          </div>

          <h3 className="text-lg font-bold capitalize mb-2">{pokemon.name}</h3>

          <div className="flex gap-1 mb-2">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`${
                  typeColors[type.type.name] || "bg-gray-500"
                } text-white px-2 py-1 rounded-full font-medium text-xs capitalize shadow-sm`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="text-xs opacity-80">
            <div className="flex justify-between">
              <span>HP:</span>
              <span>{pokemon.stats[0]?.base_stat || 0}</span>
            </div>
            <div className="flex justify-between">
              <span>ATK:</span>
              <span>{pokemon.stats[1]?.base_stat || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
