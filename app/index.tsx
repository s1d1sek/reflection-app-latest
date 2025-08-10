import { Link } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useApp } from "./_layout";

export default function Home() {
  const { seedDemo, clear } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Connect</Text>
      <Text style={styles.title}>A gentler place to reflect</Text>
      <Text style={styles.subtitle}>
        Share anonymously. Read what others feel. No judgment.
      </Text>

      <View style={styles.row}>
        <Link href="/question" asChild>
          <Button title="Start reflecting" onPress={() => {}} />
        </Link>
        <View style={{ width: 12 }} />
        <Link href="/answers" asChild>
          <Button title="Open feed" onPress={() => {}} />
        </Link>
      </View>

      <View style={{ height: 16 }} />
      <View style={styles.row}>
        <Button title="Seed Demo Data" onPress={seedDemo} />
        <View style={{ width: 12 }} />
        <Button title="Clear" onPress={clear} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:"center", justifyContent:"center", padding:24 },
  kicker:{ color:"#fff", opacity:0.9, letterSpacing:2, textTransform:"uppercase", marginBottom:6 },
  title:{ fontSize:28, fontWeight:"800", marginBottom:8, color:"#fff", textAlign:"center" },
  subtitle:{ fontSize:16, color:"#fff", opacity:0.9, textAlign:"center", maxWidth:420, marginBottom:18 },
  row:{ flexDirection:"row", alignItems:"center" },
});
