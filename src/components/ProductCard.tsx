import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Product } from "../types";

interface ProductCardProps {
  item: Product;
  onPress: (event: GestureResponderEvent) => void;
}

export default function ProductCard({ item, onPress }: ProductCardProps) {
  const { main, ...details } = item;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {main ? (
        <Image source={{ uri: main }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]} />
      )}

      <View style={styles.info}>
        {Object.entries(details).map(([key, value]) => (
          <Text key={key} style={styles.text}>
            <Text style={styles.key}>{key}: </Text>
            {String(value)}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  placeholder: { backgroundColor: "#ddd" },
  info: { flex: 1 },
  text: { fontSize: 12, color: "#333", marginBottom: 2 },
  key: { fontWeight: "bold" },
});
