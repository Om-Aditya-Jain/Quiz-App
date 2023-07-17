import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

export default function Quiz({ navigation, route }) {
  const { category, difficulty } = route.params;

  const [questions, setQuestions] = useState();
  const [options, setOptions] = useState();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [qno, setQno] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setShowResult(false);
    setShowAnswer(false);
    if (qno !== 9) {
      setQno(qno + 1);
      generateOptions(questions[qno + 1]);
    } else {
      handleResult();
    }
  };

  const handleResult = () => {
    setShowResult(false);
    setShowAnswer(false);
    navigation.navigate("Result", {
      score: score,
    });
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleOptionSelect = (_option) => {
    if (_option === questions[qno].correct_answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  const generateOptions = (_question) => {
    const optionArray = [..._question.incorrect_answers];
    optionArray.push(_question.correct_answer);
    shuffleArray(optionArray);
    setOptions(optionArray);
  };

  const getQuiz = async () => {
    setIsLoading(true);
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`;
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    generateOptions(data.results[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingDiv}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        questions && (
          <View style={styles.questionContainer}>
            <View style={styles.top}>
              <Text style={styles.question}>
                Q.{qno + 1} {decodeURIComponent(questions[qno].question)}
              </Text>
            </View>
            {!showResult ? (
              <View style={styles.options}>
                {options &&
                  options.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.optionButton}
                        key={index}
                        onPress={() => handleOptionSelect(item)}
                      >
                        <Text style={styles.option}>
                          {decodeURIComponent(item)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                {showAnswer === true ? (
                  <View style={styles.show}>
                    <Text style={styles.answerHeading}>CORRECT ANSWER</Text>
                    <Text style={styles.answer}>
                      {decodeURIComponent(questions[qno].correct_answer)}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.showButton}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleShowAnswer}
                    >
                      <Text style={styles.buttonText}>SHOW ANSWER</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.options}>
                {options &&
                  options.map((item, index) => {
                    if (item === questions[qno].correct_answer) {
                      return (
                        <TouchableOpacity
                          style={styles.correctButton}
                          key={index}
                        >
                          <Text style={styles.showOption}>
                            {decodeURIComponent(item)}
                          </Text>
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          style={styles.wrongButton}
                          key={index}
                        >
                          <Text style={styles.showOption}>
                            {decodeURIComponent(item)}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                {showAnswer === true ? (
                  <View style={styles.show}>
                    <Text style={styles.answerHeading}>CORRECT ANSWER</Text>
                    <Text style={styles.answer}>
                      {decodeURIComponent(questions[qno].correct_answer)}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.showButton}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleShowAnswer}
                    >
                      <Text style={styles.buttonText}>SHOW ANSWER</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            {qno !== 9 ? (
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={handleResult}>
                  <Text style={styles.buttonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.ResultButtons}>
                <TouchableOpacity style={styles.button} onPress={handleResult}>
                  <Text style={styles.buttonText}>SHOW RESULTS</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  questionContainer: {
    height: "100%",
  },
  top: {
    marginVertical: 12,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  buttons: {
    marginBottom: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ResultButtons: {
    marginBottom: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  showButton: {
    marginBottom: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
  showOption: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#34A0A4",
    borderRadius: 12,
  },
  correctButton: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "green",
  },
  wrongButton: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "red",
  },
  loading: {
    fontSize: 30,
    fontWeight: "800",
  },
  loadingDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  show: {
    marginVertical: 20,
    paddingLeft: 12,
  },
  answerHeading: {
    fontSize: 24,
    fontWeight: "800",
    marginVertical: 16,
  },
  answer: {
    fontSize: 20,
    fontWeight: "500",
  },
});
