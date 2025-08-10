import { Slot } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { generateMockAnswers, type MockAnswer } from "./lib/mock";

type Answer = { id: string; content: string; created_at: string; author?: string; tag?: string };
type AppCtx = {
  answers: Answer[];
  addAnswer: (a: string) => void;
  seedDemo: () => void;
  clear: () => void;
};
const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => { const v = useContext(Ctx); if (!v) throw new Error("useApp must be inside provider"); return v; };

export default function RootLayout() {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const addAnswer = (content: string) => {
    setAnswers(prev => [
      { id: Math.random().toString(36).slice(2), content, created_at: new Date().toISOString() },
      ...prev,
    ]);
  };

  const seedDemo = () => {
    const seeded = generateMockAnswers(14);
    // map to shared Answer shape
    const mapped: Answer[] = seeded.map((m: MockAnswer) => ({
      id: m.id, content: m.content, created_at: m.created_at, author: m.author, tag: m.tag
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
        <Ctx.Provider value={{ answers, addAnswer, seedDemo, clear }}>
          <Slot />
        </Ctx.Provider>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
});
