import { useMemo, useState } from "react";
import type { Pokemon } from "../models/Pokemon";
import { fetchPokemonByName } from "../services/pokemonApi";

export function usePokemonController() {
  const [pokemonName, setPokemonName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = useMemo(() => {
    const current = pokemon?.name?.toLowerCase();
    if (!current) return false;
    return favorites.some((f) => f.toLowerCase() === current);
  }, [favorites, pokemon]);

  async function searchByName(nameOverride?: string) {
    const q = (nameOverride ?? pokemonName).trim().toLowerCase();

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
      setPokemonName(result.name); // sync input with loaded pokemon
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite() {
    if (!pokemon) return;

    const name = pokemon.name.toLowerCase();

    setFavorites((prev) => {
      const exists = prev.some((f) => f.toLowerCase() === name);
      if (exists) return prev.filter((f) => f.toLowerCase() !== name);
      return [...prev, pokemon.name];
    });
  }

  function loadFavorite(name: string) {
    setPokemonName(name);
    searchByName(name);
  }

  return {
    pokemonName,
    setPokemonName,
    loading,
    error,
    pokemon,

    favorites,
    isFavorite,
    toggleFavorite,
    loadFavorite,

    searchByName,
  };
}