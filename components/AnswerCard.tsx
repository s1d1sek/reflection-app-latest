// components/AnswerCard.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AnswerCard({
  content, author, tag, time,
}: { content: string; author?: string; tag?: string; time: string }) {
  const initials = author ? author.slice(0,2).toUpperCase() : "AN";
  return (
    <View style={styles.card}>
      {/* Meta row */}
      <View style={styles.row}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.author}>{author ?? "Anonymous"}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        {tag ? <View style={styles.chip}><Text style={styles.chipText}>{tag}</Text></View> : null}
      </View>

      {/* Content */}
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ backgroundColor:"rgba(255,255,255,0.95)", borderRadius:12, padding:12, borderWidth:1, borderColor:"rgba(255,255,255,0.6)" },
  row:{ flexDirection:"row", alignItems:"center", marginBottom:8, gap:10 },
  avatar:{ width:36, height:36, borderRadius:18, backgroundColor:"#111827", alignItems:"center", justifyContent:"center" },
  avatarText:{ color:"#fff", fontWeight:"700" },
  author:{ fontWeight:"700", color:"#111827" },
  time:{ color:"#6b7280", fontSize:12 },
  chip:{ backgroundColor:"#111827", paddingHorizontal:8, paddingVertical:4, borderRadius:999 },
  chipText:{ color:"#fff", fontSize:12, textTransform:"capitalize" },
  content:{ color:"#111827", fontSize:16, lineHeight:22 },
});
