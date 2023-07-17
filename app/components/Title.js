import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "600",
  },
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
