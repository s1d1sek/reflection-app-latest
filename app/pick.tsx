import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import QuestionBubbles from "../components/QuestionBubbles";
import { useApp } from "./_layout";

export default function Pick() {
  const { setQuestionIndex } = useApp();
  const onSelect = (i: number) => {
    setQuestionIndex(i);
    router.replace("/question");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Choose a question" }} />
      <QuestionBubbles align="center" onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
});
