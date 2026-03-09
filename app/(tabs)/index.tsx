import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { usePokemonController } from "../../controllers/usePokemonController";

export default function HomeScreen() {
  const c = usePokemonController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={c.pokemonName}
        onChangeText={c.setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={c.searchByName} />

      {c.loading && <Text style={styles.info}>Loading...</Text>}
      {!!c.error && <Text style={styles.error}>{c.error}</Text>}

      {c.pokemon && (
        <View style={styles.card}>
          <Text style={styles.pokeName}>{c.pokemon.name}</Text>

          {!!c.pokemon.image && (
            <Image source={{ uri: c.pokemon.image }} style={styles.sprite} />
          )}

          <Text style={styles.sectionTitle}>Types</Text>
          <Text>{c.pokemon.types.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>Abilities</Text>
          <Text>{c.pokemon.abilities.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>First 5 moves</Text>
          <Text>{c.pokemon.moves.join(", ") || "—"}</Text>
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