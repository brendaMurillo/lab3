import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type PokemonResult = {
  name: string;
  image: string;
};

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<PokemonResult | null>(null);

  async function handleSearch() {
    const q = pokemonName.trim().toLowerCase();

    // validate
    if (!q) {
      setError("Please enter a Pokémon name.");
      return;
    }

    // start new search: reset state
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
      console.log("Full JSON response:", data);

      // minimal shaped object for checkpoint 2
      const result: PokemonResult = {
        name: data?.name ?? q,
        image: data?.sprites?.front_default ?? "",
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
        <Text style={styles.info}>
          Loaded: {pokemon.name} {pokemon.image ? "✅" : ""}
        </Text>
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
});