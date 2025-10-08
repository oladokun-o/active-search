import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";

// Try without CORS proxy first
const API_URL = "https://dialist.ngrok.dev/api/v1/watches";

// Alternative: If CORS is blocking, try with proxy
// const API_URL = "https://cors-anywhere.herokuapp.com/https://dialist.ngrok.dev/api/v1/watches";

export default function SearchScreen() {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts("");
  }, []);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchProducts = async (search: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = search
        ? `${API_URL}?q=${encodeURIComponent(search)}`
        : API_URL;

      console.log("🔍 Fetching from:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("📊 Response status:", res.status);
      console.log("📋 Response OK:", res.ok);

      // Check if response is OK
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      // Check content type
      const contentType = res.headers.get("content-type");
      console.log("📄 Content-Type:", contentType);

      if (!contentType?.includes("application/json")) {
        const text = await res.text();
        console.error("❌ Non-JSON response:", text.substring(0, 200));
        throw new Error(
          "API returned non-JSON response. The ngrok URL might be expired."
        );
      }

      const json = await res.json();
      console.log(
        "✅ Parsed JSON type:",
        Array.isArray(json) ? "Array" : "Object"
      );
      console.log(
        "✅ Data length:",
        Array.isArray(json) ? json.length : json.data?.length
      );

      // Handle both direct array and enveloped response
      const productsData = Array.isArray(json) ? json : json.data || [];

      setProducts(productsData);
      console.log("🎯 Set", productsData.length, "products");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search watches (e.g., Rolex, Omega)..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {loading && products.length === 0 ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading watches...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.error}>⚠️ {error}</Text>
          <Text style={styles.errorSubtext}>
            {error.includes("ngrok")
              ? "The API URL might be expired. Check if the ngrok tunnel is active."
              : "Please check your internet connection and try again."}
          </Text>
          <Text style={styles.debugText}>Check console for details</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.empty}>
            {query ? `No watches found for "${query}"` : "No watches available"}
          </Text>
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => console.log("🔔 Clicked:", item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    margin: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  error: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  debugText: {
    marginTop: 12,
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  listContent: {
    padding: 10,
  },
});
