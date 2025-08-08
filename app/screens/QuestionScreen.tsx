import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function QuestionScreen({
  question,
  onSubmit,
}: {
  question: string;
  onSubmit: (answer: string) => void;
}) {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.q}>{question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your reflection…"
        multiline
        value={text}
        onChangeText={setText}
      />
      <Button
        title="Submit anonymously"
        onPress={() => {
          if (text.trim().length) {
            onSubmit(text.trim());
            setText('');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#fff', justifyContent: 'center' },
  q: { fontSize: 20, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, minHeight: 120 },
});
