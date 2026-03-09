import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { Pokemon } from "../models/Pokemon";

type Props = {
  pokemonName: string;
  onChangePokemonName: (v: string) => void;
  onSearch: () => void;

  loading: boolean;
  error: string;
  pokemon: Pokemon | null;
};

export function PokemonView(props: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  const spin = useMemo(() => {
    return spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  }, [spinAnim]);

  // UI-only animation: replay when pokemon changes from null -> real pokemon
  useEffect(() => {
    if (!props.pokemon) return;

    fadeAnim.setValue(0);
    spinAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [props.pokemon, fadeAnim, spinAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={props.pokemonName}
        onChangeText={props.onChangePokemonName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={props.onSearch} />

      {props.loading && <Text style={styles.info}>Loading...</Text>}
      {!!props.error && <Text style={styles.error}>{props.error}</Text>}

      {props.pokemon && (
        <Animated.View
          style={[
            styles.card,
            { opacity: fadeAnim, transform: [{ rotate: spin }] },
          ]}
        >
          <Text style={styles.pokeName}>{props.pokemon.name}</Text>

          {!!props.pokemon.image && (
            <Image source={{ uri: props.pokemon.image }} style={styles.sprite} />
          )}

          <Text style={styles.sectionTitle}>Types</Text>
          <Text>{props.pokemon.types.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>Abilities</Text>
          <Text>{props.pokemon.abilities.join(", ") || "—"}</Text>

          <Text style={styles.sectionTitle}>First 5 moves</Text>
          <Text>{props.pokemon.moves.join(", ") || "—"}</Text>
        </Animated.View>
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