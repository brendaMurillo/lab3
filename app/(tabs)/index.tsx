import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";

type PokemonResult = {
  name: string;
  image: string;
  types: string[];
  abilities: string[];
  moves: string[];
};

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<PokemonResult | null>(null);

  async function handleSearch() {
    const q = pokemonName.trim().toLowerCase();

    if (!q) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${q}`);

      if (!response.ok) {
        setError(`Pokémon not found (HTTP ${response.status})`);
        return;
      }

      const data = await response.json();

      const types =
        Array.isArray(data?.types)
          ? data.types
              .map((t: any) => t?.type?.name)
              .filter(Boolean)
          : [];

      const abilities =
        Array.isArray(data?.abilities)
          ? data.abilities
              .map((a: any) => a?.ability?.name)
              .filter(Boolean)
          : [];

      const movesAll =
        Array.isArray(data?.moves)
          ? data.moves
              .map((m: any) => m?.move?.name)
              .filter(Boolean)
          : [];

      const result: PokemonResult = {
        name: data?.name ?? q,
        image: data?.sprites?.front_default ?? "",
        types,
        abilities,
        moves: movesAll.slice(0, 5),
      };

      setPokemon(result);
    } catch (e) {
      setError("Network error. Please try again.");
      console.log("Network error:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={handleSearch} />

      {loading && <Text style={styles.info}>Loading...</Text>}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {pokemon && (
        <View style={styles.card}>
          <Text style={styles.pokeName}>{pokemon.name}</Text>

          {!!pokemon.image && (
            <Image source={{ uri: pokemon.image }} style={styles.sprite} />
          )}

          <Text style={styles.sectionTitle}>Types</Text>
          <Text>{pokemon.types.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>Abilities</Text>
          <Text>{pokemon.abilities.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>First 5 moves</Text>
          <Text>{pokemon.moves.join(", ") || "—"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  info: {
    marginTop: 8,
  },
  error: {
    marginTop: 8,
    color: "crimson",
    fontWeight: "600",
  },
  card: {
    marginTop: 14,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    gap: 6,
    alignItems: "center",
  },
  pokeName: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  sprite: {
    width: 140,
    height: 140,
  },
  sectionTitle: {
    marginTop: 6,
    fontWeight: "700",
    alignSelf: "flex-start",
  },
});