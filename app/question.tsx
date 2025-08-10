import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useApp } from "./_layout";

const QUESTION = "What emotion are you avoiding today?";
const MAX = 500;

export default function QuestionRoute() {
  const [text, setText] = useState("");
  const { addAnswer } = useApp();
  const remaining = MAX - text.length;
  const disabled = text.trim().length === 0 || text.length > MAX;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Question" }} />
      <Text style={styles.q}>{QUESTION}</Text>

      <TextInput
        style={styles.input}
        placeholder="Type your reflection…"
        placeholderTextColor="rgba(255,255,255,0.7)"
        multiline
        value={text}
        onChangeText={setText}
        maxLength={MAX + 1}
      />
      <Text style={styles.counter}>
        {remaining >= 0 ? `${remaining} characters left` : "Too long"}
      </Text>

      <Button
        title={disabled ? "Write something…" : "Submit anonymously"}
        disabled={disabled}
        onPress={() => {
          const v = text.trim();
          if (!v) return;
          addAnswer(v);
          setText("");
          router.replace("/answers");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:"center", justifyContent:"center", padding:16 },
  q:{ color:"#fff", fontSize:20, fontWeight:"600", textAlign:"center", marginBottom:8, maxWidth:520 },
  input:{
    width:"100%", borderWidth:1, borderColor:"rgba(255,255,255,0.6)", borderRadius:10,
    padding:12, minHeight:140, color:"#fff", backgroundColor:"rgba(0,0,0,0.28)"
  },
  counter:{ color:"#fff", opacity:0.85, alignSelf:"flex-end", marginVertical:8 },
});
