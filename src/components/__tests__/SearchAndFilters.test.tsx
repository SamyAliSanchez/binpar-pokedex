import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchAndFilters from "../SearchAndFilters";
import { pokeApi } from "@/services/pokeapi";
import { Generation, Type } from "@/types/pokemon";

jest.mock("@/services/pokeapi", () => ({
  pokeApi: {
    getTypes: jest.fn(),
    getGenerations: jest.fn(),
  },
}));

const mockedPokeApi = pokeApi as jest.Mocked<typeof pokeApi>;

const sampleTypes: Type[] = [
  {
    id: 1,
    name: "fire",
    pokemon: [],
  },
  {
    id: 2,
    name: "unknown",
    pokemon: [],
  },
  {
    id: 3,
    name: "shadow",
    pokemon: [],
  },
  {
    id: 4,
    name: "electric",
    pokemon: [],
  },
];

const sampleGenerations: Generation[] = [
  {
    id: 2,
    name: "generation-ii",
    pokemon_species: new Array(5).fill(null).map((_, index) => ({
      name: `gen-2-${index}`,
      url: `https://pokeapi.co/api/v2/pokemon/${index}`,
    })),
  },
  {
    id: 1,
    name: "generation-i",
    pokemon_species: new Array(3).fill(null).map((_, index) => ({
      name: `gen-1-${index}`,
      url: `https://pokeapi.co/api/v2/pokemon/${index}`,
    })),
  },
];

const renderComponent = (
  props?: Partial<Parameters<typeof SearchAndFilters>[0]>
) => {
  return render(
    <SearchAndFilters
      onSearchChange={props?.onSearchChange ?? jest.fn()}
      onTypeFilter={props?.onTypeFilter ?? jest.fn()}
      onGenerationFilter={props?.onGenerationFilter ?? jest.fn()}
      searchValue={props?.searchValue ?? ""}
      selectedType={props?.selectedType ?? ""}
      selectedGeneration={props?.selectedGeneration ?? ""}
    />
  );
};

function ControlledHarness({
  onSearchChange,
  onTypeFilter,
  onGenerationFilter,
}: {
  onSearchChange: jest.Mock;
  onTypeFilter: jest.Mock;
  onGenerationFilter: jest.Mock;
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [generation, setGeneration] = useState("");

  return (
    <SearchAndFilters
      searchValue={search}
      selectedType={type}
      selectedGeneration={generation}
      onSearchChange={(value) => {
        setSearch(value);
        onSearchChange(value);
      }}
      onTypeFilter={(value) => {
        setType(value);
        onTypeFilter(value);
      }}
      onGenerationFilter={(value) => {
        setGeneration(value);
        onGenerationFilter(value);
      }}
    />
  );
}

describe("SearchAndFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows the loading skeleton until filters finish loading", async () => {
    mockedPokeApi.getTypes.mockResolvedValue(sampleTypes);
    mockedPokeApi.getGenerations.mockResolvedValue(sampleGenerations);

    renderComponent();

    expect(
      screen.queryByText("Buscar y Filtrar Pokémon")
    ).not.toBeInTheDocument();

    await screen.findByText("Buscar y Filtrar Pokémon");
  });

  it("renders the fetched type and generation options excluding special cases", async () => {
    mockedPokeApi.getTypes.mockResolvedValue(sampleTypes);
    mockedPokeApi.getGenerations.mockResolvedValue(sampleGenerations);

    renderComponent({
      selectedType: "",
      selectedGeneration: "",
    });

    const typeSelect = (await screen.findByLabelText(
      "Filtrar por tipo"
    )) as HTMLSelectElement;
    const typeOptions = within(typeSelect)
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(typeOptions).toEqual(["Todos los tipos", "Fire", "Electric"]);

    const generationSelect = screen.getByLabelText(
      "Filtrar por generación"
    ) as HTMLSelectElement;
    const generationOptions = within(generationSelect)
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(generationOptions).toEqual([
      "Todas las generaciones",
      "Generation i (3 Pokémon)",
      "Generation ii (5 Pokémon)",
    ]);
  });

  it("propagates user input to the provided callbacks", async () => {
    mockedPokeApi.getTypes.mockResolvedValue(sampleTypes);
    mockedPokeApi.getGenerations.mockResolvedValue(sampleGenerations);

    const onSearchChange = jest.fn();
    const onTypeFilter = jest.fn();
    const onGenerationFilter = jest.fn();
    const user = userEvent.setup();

    render(
      <ControlledHarness
        onSearchChange={onSearchChange}
        onTypeFilter={onTypeFilter}
        onGenerationFilter={onGenerationFilter}
      />
    );

    await screen.findByLabelText("Buscar por nombre");

    await user.type(screen.getByLabelText("Buscar por nombre"), "char");
    expect(onSearchChange).toHaveBeenLastCalledWith("char");

    await user.selectOptions(
      screen.getByLabelText("Filtrar por tipo"),
      "electric"
    );
    expect(onTypeFilter).toHaveBeenCalledWith("electric");

    await user.selectOptions(
      screen.getByLabelText("Filtrar por generación"),
      "generation-ii"
    );
    expect(onGenerationFilter).toHaveBeenCalledWith("generation-ii");
  });
});
