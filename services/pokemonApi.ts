// services/pokemonApi.ts
import type { Pokemon } from "../models/Pokemon";
import { PokemonBuilder } from "../models/PokemonBuilder";

export async function fetchPokemonByName(nameRaw: string): Promise<Pokemon> {
  const name = nameRaw.trim().toLowerCase();

  if (!name) {
    throw new Error("Please enter a Pokémon name.");
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!response.ok) {
    throw new Error(`Pokémon not found (HTTP ${response.status})`);
  }

  const data = await response.json();

  const types = Array.isArray(data?.types)
    ? data.types.map((t: any) => t?.type?.name).filter(Boolean)
    : [];

  const abilities = Array.isArray(data?.abilities)
    ? data.abilities.map((a: any) => a?.ability?.name).filter(Boolean)
    : [];

  const movesAll = Array.isArray(data?.moves)
    ? data.moves.map((m: any) => m?.move?.name).filter(Boolean)
    : [];

  const pokemon = new PokemonBuilder()
    .setName(data?.name ?? name)
    .setImage(data?.sprites?.front_default ?? "")
    .setTypes(types)
    .setAbilities(abilities)
    .setMoves(movesAll.slice(0, 5))
    .build();

  return pokemon;
}