// app/_layout.tsx
import { Slot } from "expo-router";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { generateMockAnswers, type MockAnswer } from "./lib/mock";
import { QUESTIONS } from "./lib/questions";

export type Answer = {
  id: string;
  content: string;
  created_at: string;
  question: string;
  author?: string;
  tag?: string;
};

type AppCtx = {
  answers: Answer[];
  addAnswer: (content: string, question: string) => void;
  seedDemo: () => void;
  clear: () => void;

  currentQuestionIndex: number;
  currentQuestion: string;
  nextQuestion: () => void;
  setQuestionIndex: (i: number) => void;
};

const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be inside provider");
  return v;
};

export default function RootLayout() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = useMemo(
    () => QUESTIONS[currentQuestionIndex % QUESTIONS.length],
    [currentQuestionIndex]
  );

  const addAnswer = (content: string, question: string) => {
    setAnswers(prev => [
      { id: Math.random().toString(36).slice(2), content, created_at: new Date().toISOString(), question },
      ...prev,
    ]);
  };

  const nextQuestion = () => setCurrentQuestionIndex(i => (i + 1) % QUESTIONS.length);
  const setQuestionIndex = (i: number) => setCurrentQuestionIndex(((i % QUESTIONS.length) + QUESTIONS.length) % QUESTIONS.length);

  const seedDemo = () => {
    const seeded = generateMockAnswers(16);
    const mapped: Answer[] = seeded.map((m: MockAnswer) => ({
      id: m.id,
      content: m.content,
      created_at: m.created_at,
      question: m.question,
      author: m.author,
      tag: m.tag,
    }));
    setAnswers(mapped);
  };

  const clear = () => setAnswers([]);

  return (
    <ImageBackground
      source={require("../assets/images/backround_img.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <Ctx.Provider
          value={{
            answers,
            addAnswer,
            seedDemo,
            clear,
            currentQuestionIndex,
            currentQuestion,
            nextQuestion,
            setQuestionIndex,
          }}
        >
          <Slot />
        </Ctx.Provider>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.15)" },
});
