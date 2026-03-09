// controllers/usePokemonController.ts
import { useState } from "react";
import type { Pokemon } from "../models/Pokemon";
import { fetchPokemonByName } from "../services/pokemonApi";

export function usePokemonController() {
  const [pokemonName, setPokemonName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  async function searchByName() {
    const q = pokemonName.trim();

    if (!q) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const result = await fetchPokemonByName(q);
      setPokemon(result);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    pokemonName,
    setPokemonName,
    loading,
    error,
    pokemon,
    searchByName,
  };
}