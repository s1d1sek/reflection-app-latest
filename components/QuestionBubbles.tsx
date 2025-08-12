import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { QUESTIONS } from "../app/questions";

type Props = {
  onSelect: (index: number) => void;
  align?: "right" | "center";
};

export default function QuestionBubbles({ onSelect, align = "right" }: Props) {
  return (
    <View
      style={[
        styles.container,
        align === "right" ? styles.right : styles.center,
      ]}
    >
      <Text style={styles.header}>Pick a question</Text>
      <View style={styles.wrap}>
        {QUESTIONS.map((q, i) => (
          <Pressable
            key={i}
            onPress={() => onSelect(i)}
            style={({ pressed, hovered }) => [
              styles.bubble,
              pressed && styles.bubblePressed,
              Platform.OS === "web" && hovered ? styles.bubbleHover : null,
            ]}
          >
            <Text style={styles.bubbleText}>{q}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    maxWidth: 420,
  },
  right: {
    alignSelf: "flex-end",
  },
  center: {
    alignSelf: "center",
  },
  header: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 0.3,
    opacity: 0.85,
  },
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.82)",
    borderColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: 400,
  },
  bubbleHover: {
    transform: [{ translateY: -1 }],
  },
  bubblePressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  bubbleText: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
});
