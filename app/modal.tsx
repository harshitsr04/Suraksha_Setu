import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';



import { ThemedText } from './components/themed-text'; // Correct relative path

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
