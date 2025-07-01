import { SafeAreaView, StyleSheet, Text, View, } from 'react-native';
import TodoScreen from './app/todo';
import HomeScreen from './src/Home/homeScreen';

export default function App() {
  return (
    <SafeAreaView>
   
      <View style={styles.container}>
        {/* <TodoScreen /> */}
        <HomeScreen/>
      </View>

    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({});
