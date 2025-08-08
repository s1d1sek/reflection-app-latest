import { Stack, router } from 'expo-router';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useApp } from './_layout';

export default function Answers() {
  const { answers } = useApp();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Anonymous Reflections' }} />
      <FlatList
        data={answers}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListEmptyComponent={<Text style={styles.empty}>No answers yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}><Text>{item}</Text></View>
        )}
      />
      <View style={{ padding: 16 }}>
        <Button title="Back to Home" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#fafafa'},
  card:{backgroundColor:'#fff',borderWidth:1,borderColor:'#e5e5e5',borderRadius:10,padding:12},
  empty:{textAlign:'center',marginTop:24,color:'#666'},
});
