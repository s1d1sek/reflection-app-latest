// app/answers.tsx
import { Stack, router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Button,
  Easing,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Group answers by question
  const sections = useMemo(() => {
    const map = new Map<string, typeof answers>();
    for (const a of answers) {
      const arr = map.get(a.question) ?? [];
      arr.push(a);
      map.set(a.question, arr);
    }
    const entries = Array.from(map.entries()).map(([question, data]) => ({
      title: question,
      data: data.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)),
      latest: Math.max(...data.map((x) => new Date(x.created_at).getTime())),
      count: data.length,
    }));
    entries.sort((a, b) => b.latest - a.latest);
    return entries;
  }, [answers]);

  const toggle = useCallback((q: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(q) ? next.delete(q) : next.add(q);
      return next;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Anonymous Reflections" }} />
      {sections.length === 0 ? (
        <Text style={styles.empty}>No answers yet. Try “Seed Demo Data” on Home.</Text>
      ) : (
        <SectionList
          sections={sections.map(s => ({
            title: s.title,
            data: s.data,                   // we render via header, but keep data for keys
            meta: { count: s.count },
          })) as any}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 28, gap: 8 }}
          // REQUIRED even if we don't use it; return null to avoid double rendering
          renderItem={() => null}
          renderSectionHeader={({ section }) => {
            const q = section.title as string;
            const count = (section.meta as any).count as number;
            const isOpen = expanded.has(q);

            return (
              <View>
                <Pressable
                  onPress={() => toggle(q)}
                  style={({ pressed }) => [
                    styles.qBubble,
                    isOpen && styles.qBubbleOpen,
                    pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] },
                  ]}
                >
                  <Text style={styles.chev}>{isOpen ? "▾" : "▸"}</Text>
                  <Text style={styles.qText} numberOfLines={2}>{q}</Text>
                  <View style={styles.countPill}>
                    <Text style={styles.countText}>{count}</Text>
                  </View>
                </Pressable>

                <AnimatedAnswers isOpen={isOpen}>
                  <View style={styles.answerIndent}>
                    {section.data.map((item: any) => (
                      <View key={item.id} style={{ marginVertical: 5 }}>
                        <AnswerCard
                          content={item.content}
                          author={item.author}
                          tag={item.tag}
                          time={timeAgo(item.created_at)}
                        />
                      </View>
                    ))}
                  </View>
                </AnimatedAnswers>
              </View>
            );
          }}
          SectionSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      )}

      <View style={{ padding: 16 }}>
        <Button title="Back to Home" onPress={() => router.replace("/")} />
      </View>
    </View>
  );
}

/**
 * AnimatedAnswers measures its children once, then animates height + opacity to/from that value.
 */
function AnimatedAnswers({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const animation = useRef(new Animated.Value(0)).current;   // 0 closed, 1 open
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // height needs layout driver
    }).start();
  }, [isOpen]);

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });
  const opacity = animation;

  return (
    <Animated.View style={{ height, opacity, overflow: "hidden" }}>
      {/* This inner View measures true content height */}
      <View
        style={{ position: "absolute", left: 0, right: 0 }}
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: "center", marginTop: 24, color: "#fff" },

  // Question bubble
  qBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: "rgba(255,255,255,0.7)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: "100%",
  },
  qBubbleOpen: { backgroundColor: "rgba(255,255,255,0.98)" },
  chev: { color: "#111827", fontSize: 16, width: 16, textAlign: "center" },
  qText: { color: "#111827", fontSize: 14, lineHeight: 18, fontWeight: "700", flexShrink: 1 },
  countPill: {
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  countText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  // Indentation for answers under the bubble
  answerIndent: {
    marginLeft: 24,
    paddingLeft: 4,
  },
});
