import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ImageBackground, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import OrbitConnect from "../components/OrbitConnect";

export default function Landing() {
  useEffect(() => {
    // After ~6.5s (animation ~5s + small pause), go to /home
    const t = setTimeout(() => router.replace("/home"), 6500);
    return () => clearTimeout(t);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/backround_img.jpg")}
      style={styles.bg}
      resizeMode="cover"
      blurRadius={20}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.overlay}>
        <Pressable style={styles.center} onPress={() => router.replace("/home")}>
          <OrbitConnect size={320} duration={5000} />
          <Text style={styles.brand}>Connect</Text>
          <Text style={styles.hint}>
            {Platform.OS === "web" ? "Click" : "Tap"} to enter
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 16 },
  brand: { color: "#fff", fontSize: 20, fontWeight: "800", letterSpacing: 1 },
  hint:  { color: "rgba(255,255,255,0.85)" },
});
