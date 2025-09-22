"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface PokemonListState {
  search: string;
  selectedType: string;
  selectedGeneration: string;
}

interface PokemonListContextType {
  state: PokemonListState;
  updateState: (updates: Partial<PokemonListState>) => void;
}

const PokemonListContext = createContext<PokemonListContextType | undefined>(
  undefined
);

interface PokemonListProviderProps {
  children: ReactNode;
}

export function PokemonListProvider({ children }: PokemonListProviderProps) {
  const [state, setState] = useState<PokemonListState>({
    search: "",
    selectedType: "",
    selectedGeneration: "",
  });

  const updateState = (updates: Partial<PokemonListState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const value: PokemonListContextType = {
    state,
    updateState,
  };

  return (
    <PokemonListContext.Provider value={value}>
      {children}
    </PokemonListContext.Provider>
  );
}

export function usePokemonListState() {
  const context = useContext(PokemonListContext);
  if (context === undefined) {
    throw new Error(
      "usePokemonListState must be used within a PokemonListProvider"
    );
  }
  return context;
}
