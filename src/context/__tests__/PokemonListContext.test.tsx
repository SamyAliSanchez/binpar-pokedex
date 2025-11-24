import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  PokemonListProvider,
  usePokemonListState,
} from "../PokemonListContext";

function TestConsumer() {
  const { state, updateState } = usePokemonListState();

  return (
    <>
      <div data-testid="state">{JSON.stringify(state)}</div>
      <button
        onClick={() =>
          updateState({ search: "pikachu", selectedGeneration: "kanto" })
        }
      >
        update-state
      </button>
      <button onClick={() => updateState({ selectedType: "electric" })}>
        update-type
      </button>
    </>
  );
}

describe("PokemonListContext", () => {
  it("throws when used outside of the provider", () => {
    // Rendering without the provider must raise to surface incorrect usage early.
    expect(() => render(<TestConsumer />)).toThrow(
      "usePokemonListState must be used within a PokemonListProvider"
    );
  });

  it("provides the default state values", () => {
    render(
      <PokemonListProvider>
        <TestConsumer />
      </PokemonListProvider>
    );

    expect(screen.getByTestId("state").textContent).toBe(
      JSON.stringify({
        search: "",
        selectedType: "",
        selectedGeneration: "",
      })
    );
  });

  it("merges partial updates without losing previous fields", async () => {
    const user = userEvent.setup();

    render(
      <PokemonListProvider>
        <TestConsumer />
      </PokemonListProvider>
    );

    await user.click(screen.getByText("update-state"));
    expect(screen.getByTestId("state").textContent).toBe(
      JSON.stringify({
        search: "pikachu",
        selectedType: "",
        selectedGeneration: "kanto",
      })
    );

    await user.click(screen.getByText("update-type"));
    expect(screen.getByTestId("state").textContent).toBe(
      JSON.stringify({
        search: "pikachu",
        selectedType: "electric",
        selectedGeneration: "kanto",
      })
    );
  });
});
