import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { Product, ApiResponse } from "../types";

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://dialist.ngrok.dev/api/v1/watches";

export default function SearchScreen() {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchProducts = async (search: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}${search ? `?q=${search}` : ""}`);
      const json: ApiResponse = await res.json();
      setProducts(json.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search watches..."
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : products.length === 0 ? (
        <Text style={styles.empty}>No results</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) =>
            item.id?.toString() || `product-${index}`
          }
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => console.log("Clicked:", item)}
            />
          )}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  empty: { textAlign: "center", marginTop: 20, color: "#777" },
});
