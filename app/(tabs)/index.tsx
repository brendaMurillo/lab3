import React from "react";
import { PokemonView } from "../../components/PokemonView";
import { usePokemonController } from "../../controllers/usePokemonController";

export default function HomeScreen() {
  const c = usePokemonController();

  return (
    <PokemonView
      pokemonName={c.pokemonName}
      onChangePokemonName={c.setPokemonName}
      onSearch={() => c.searchByName()}
      loading={c.loading}
      error={c.error}
      pokemon={c.pokemon}
      favorites={c.favorites}
      isFavorite={c.isFavorite}
      onToggleFavorite={c.toggleFavorite}
      onLoadFavorite={c.loadFavorite}
    />
  );
}