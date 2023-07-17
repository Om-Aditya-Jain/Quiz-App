import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8DD",
  },
});
