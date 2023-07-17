import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Result({ navigation, route }) {
  const { score } = route.params;
  const bannerImage =
    score >= 8
      ? require("../assets/winner.png")
      : score >= 5 && score < 8
      ? require("../assets/learning.png")
      : require("../assets/loser.png");
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Result</Text>
        <Text style={styles.score}>{score}/10</Text>
        <Text style={styles.score}>
          {score === 10
            ? "Excellent"
            : score >= 8 && score < 10
            ? "Very Good"
            : score >= 5 && score < 8
            ? "Nice"
            : "Try Again..."}
        </Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={bannerImage}
          style={styles.banner}
          resizeMode="contain"
        ></Image>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>GO TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginVertical: 16,
  },
  titleContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    width: "100%",
    backgroundColor: "#1A759F",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  score: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
  },
});
