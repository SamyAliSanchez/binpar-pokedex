"use client";

import { useState, useEffect } from "react";
import { pokeApi } from "@/services/pokeapi";
import { Generation, Type } from "@/types/pokemon";

interface SearchAndFiltersProps {
  onSearchChange: (search: string) => void;
  onTypeFilter: (type: string) => void;
  onGenerationFilter: (generation: string) => void;
  searchValue: string;
  selectedType: string;
  selectedGeneration: string;
}

export default function SearchAndFilters({
  onSearchChange,
  onTypeFilter,
  onGenerationFilter,
  searchValue,
  selectedType,
  selectedGeneration,
}: SearchAndFiltersProps) {
  const [types, setTypes] = useState<Type[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [typesData, generationsData] = await Promise.all([
          pokeApi.getTypes(),
          pokeApi.getGenerations(),
        ]);

        setTypes(
          typesData.filter(
            (type) => type.name !== "unknown" && type.name !== "shadow"
          )
        );
        setGenerations(generationsData.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error("Error loading filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Buscar y Filtrar Pokémon
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Buscar por nombre
          </label>
          <input
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ej: Pikachu, Charizard..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Busca Pokémon y sus evoluciones
          </p>
        </div>

        <div>
          <label
            htmlFor="type-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por tipo
          </label>
          <select
            id="type-filter"
            value={selectedType}
            onChange={(e) => onTypeFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {formatName(type.name)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="generation-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por generación
          </label>
          <select
            id="generation-filter"
            value={selectedGeneration}
            onChange={(e) => onGenerationFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las generaciones</option>
            {generations.map((generation) => (
              <option key={generation.id} value={generation.name}>
                {formatName(generation.name)} (
                {generation.pokemon_species.length} Pokémon)
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
