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
  // Extract images object and _id, keep everything else for display
  const { images, _id, ...details } = item;

  // Get the main image from the nested images object
  const mainImage = images?.watch || images?.dial;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {mainImage ? (
        <Image
          source={{ uri: mainImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.info}>
        {Object.entries(details).map(([key, value]) => {
          // Skip rendering if value is null, undefined, or an object
          if (!value || typeof value === "object") return null;

          return (
            <Text key={key} style={styles.text} numberOfLines={1}>
              <Text style={styles.key}>{key}: </Text>
              {String(value)}
            </Text>
          );
        })}
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  placeholder: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 10,
    color: "#999",
  },
  info: { flex: 1 },
  text: {
    fontSize: 12,
    color: "#333",
    marginBottom: 3,
  },
  key: { fontWeight: "bold" },
});
