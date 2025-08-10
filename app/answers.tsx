import { Stack, router } from "expo-router";
import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import AnswerCard from "../components/AnswerCard";
import { useApp } from "./_layout";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diff / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.floor(hrs / 24);
  return `${d}d ago`;
}

export default function Answers() {
  const { answers } = useApp();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Anonymous Reflections" }} />
      <FlatList
        data={answers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 28 }}
        ListEmptyComponent={<Text style={styles.empty}>No answers yet. Try “Seed Demo Data” on Home.</Text>}
        renderItem={({ item }) => (
          <AnswerCard
            content={item.content}
            author={item.author}
            tag={item.tag}
            time={timeAgo(item.created_at)}
          />
        )}
      />
      <View style={{ padding: 16 }}>
        <Button title="Back to Home" onPress={() => router.replace("/")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: "center", marginTop: 24, color: "#fff" },
});
