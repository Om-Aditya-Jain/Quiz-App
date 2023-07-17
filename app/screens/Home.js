import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import Title from "../components/Title";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.bannerContainer}>
        <Image
          source={require("../assets/OnlineTest.jpg")}
          style={styles.banner}
          resizeMode="contain"
        ></Image>
        <View style={styles.pickerDiv}>
          <Text style={styles.pickerHeading}>Select Category</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={category}
              style={{
                height: 50,
                width: 250,
              }}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="General Knowledge" value="9" />
              <Picker.Item label="Science & Nature" value="17" />
              <Picker.Item label="Computer" value="18" />
              <Picker.Item label="Sports" value="21" />
              <Picker.Item label="Animals" value="27" />
            </Picker>
          </View>
        </View>
        <View style={styles.pickerDivBottom}>
          <Text style={styles.pickerHeading}>Select Difficulty</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={difficulty}
              style={{ height: 50, width: 250 }}
              onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
            >
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Quiz", {
            category: category,
            difficulty: difficulty,
          })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  banner: {
    height: 350,
    width: 350,
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
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  pickerDiv: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
  },
  pickerDivBottom: {
    margin: 15,
    marginBottom: 150,
  },
  picker: {
    borderWidth: 1,
    borderRadius: 15,
  },
  pickerHeading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 4,
  },
});
