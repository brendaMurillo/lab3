import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");

  async function handleSearch() {
    const q = pokemonName.trim().toLowerCase();

    // Validate input
    if (!q) {
      console.log("Please enter a Pokémon name.");
      return;
    }

    try {
      // Call PokéAPI
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/{name}`
      );

      // fetch does NOT throw on 404 — we must check manually
      if (!response.ok) {
        console.log(`Pokémon not found (HTTP ${response.status})`);
        return;
      }

      // Parse JSON
      const data = await response.json();

      // Log full JSON
      console.log("Full JSON response:", data);

    } catch (error) {
      console.log("Network error:", error);
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
});