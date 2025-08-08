import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Reflect</Text>
      <Text style={styles.subtitle}>A space to reflect anonymously.</Text>
      <Button title="Start Reflecting" onPress={onStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f7f7f7' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { fontSize: 16, marginBottom: 24, textAlign: 'center' },
});
