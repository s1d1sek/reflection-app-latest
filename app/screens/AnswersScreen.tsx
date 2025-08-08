import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function AnswersScreen({
  answers,
  onBack,
}: {
  answers: string[];
  onBack: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anonymous Reflections</Text>
      <FlatList
        data={answers}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item}</Text>
          </View>
        )}
      />
      <View style={{ padding: 16 }}>
        <Button title="Back to start" onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 16 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e5e5', borderRadius: 10, padding: 12 },
});
