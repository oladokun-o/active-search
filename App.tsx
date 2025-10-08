import { SafeAreaView, StatusBar } from "react-native";
import SearchScreen from "./src/components/SearchScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      <SearchScreen />
    </SafeAreaView>
  );
}
