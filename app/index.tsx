import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Connect</Text>
      <Text style={styles.subtitle}>Answer anonymously. Read what others feel.</Text>

      <Link href="/question" asChild>
        <Button title="Start connecting" onPress={() => {}} />
      </Link>

      <View style={{ height: 12 }} />

      <Link href="/answers" asChild>
        <Button title="See answers wall" onPress={() => {}} />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:16},
  title:{fontSize:24,fontWeight:'700',marginBottom:8},
  subtitle:{fontSize:16,marginBottom:16,textAlign:'center'},
});
