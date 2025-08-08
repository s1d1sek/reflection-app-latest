import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from './_layout';

const QUESTION = 'What emotion are you avoiding today?';

export default function Question() {
  const { addAnswer } = useApp();
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Question' }} />
      <Text style={styles.q}>{QUESTION}</Text>
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
          const v = text.trim();
          if (!v) return Alert.alert('Please write something first.');
          addAnswer(v);
          setText('');
          router.replace('/answers');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:16,gap:12,backgroundColor:'#fff'},
  q:{fontSize:20,fontWeight:'600',textAlign:'center',marginBottom:8},
  input:{borderWidth:1,borderColor:'#ccc',borderRadius:8,padding:12,minHeight:120},
});
