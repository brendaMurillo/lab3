import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { fetchPokemonByName } from "../../services/pokemonApi";

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
    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const result = await fetchPokemonByName(pokemonName);
      setPokemon(result);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
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