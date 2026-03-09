// src/services/pokemonApi.ts
type PokemonResult = {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  moves: string[];
};

export async function fetchPokemonByName(nameRaw: string): Promise<PokemonResult> {
  const name = nameRaw.trim().toLowerCase();

  if (!name) {
    throw new Error("Please enter a Pokémon name.");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error(`Pokémon not found (HTTP ${response.status})`);
  }

  const data = await response.json();

  const types =
    Array.isArray(data?.types)
      ? data.types.map((t: any) => t?.type?.name).filter(Boolean)
      : [];

  const abilities =
    Array.isArray(data?.abilities)
      ? data.abilities.map((a: any) => a?.ability?.name).filter(Boolean)
      : [];

  const movesAll =
    Array.isArray(data?.moves)
      ? data.moves.map((m: any) => m?.move?.name).filter(Boolean)
      : [];

  return {
    name: data?.name ?? name,
    image: data?.sprites?.front_default ?? "",
    types,
    abilities,
    moves: movesAll.slice(0, 5),
  };
}