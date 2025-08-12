import { Link, router } from "expo-router";
import React from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import QuestionBubbles from "../components/QuestionBubbles";
import { useApp } from "./_layout";
import { QUESTIONS } from "./lib/questions";

export default function Home() {
  const { seedDemo, clear, setQuestionIndex, currentQuestionIndex } = useApp();

  const handlePick = (i: number) => {
    setQuestionIndex(i);
    router.replace("/question");
  };

  const isWeb = Platform.OS === "web";

  return (
    <View style={styles.container}>
      {/* Left intro column */}
      <View style={styles.leftCol}>
        <Text style={styles.kicker}>Connect</Text>
        <Text style={styles.title}>A gentler place to reflect</Text>
        <Text style={styles.subtitle}>
          {isWeb
            ? "Pick any question on the right to start reflecting."
            : "Tap Start reflecting to pick a question."}
        </Text>

        {!isWeb && (
          <>
            <View style={{ height: 16 }} />
            <Link href="/pick" asChild>
              <Button title="Start reflecting" onPress={() => {}} />
            </Link>
          </>
        )}

        <View style={{ height: 16 }} />

        <View style={styles.row}>
          <Button title="Seed Demo Data" onPress={seedDemo} />
          <View style={{ width: 12 }} />
          <Button title="Clear" onPress={clear} />
          <View style={{ width: 12 }} />
          <Link href="/answers" asChild>
            <Button title="Open feed" onPress={() => {}} />
          </Link>
        </View>

        <View style={{ height: 12 }} />
        <Text style={styles.current}>
          Current: <Text style={{ fontWeight: "800" }}>{QUESTIONS[currentQuestionIndex]}</Text>
        </Text>
      </View>

      {/* Right bubbles column (web only) */}
      {isWeb && (
        <View style={styles.rightCol}>
          <QuestionBubbles align="right" onSelect={handlePick} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    padding: 24,
  },
  leftCol: {
    maxWidth: 560,
  },
  rightCol: {
    flexGrow: 0,
  },
  kicker:{ color:"#fff", opacity:0.9, letterSpacing:2, textTransform:"uppercase", marginBottom:6 },
  title:{ fontSize:28, fontWeight:"800", marginBottom:8, color:"#fff" },
  subtitle:{ fontSize:14, color:"#fff", opacity:0.9, maxWidth:480 },
  row:{ flexDirection:"row", alignItems:"center" },
  current:{ color:"#fff", opacity:0.95 },
});
