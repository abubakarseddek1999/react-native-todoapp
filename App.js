import { NavigationContainer } from '@react-navigation/native';
import TodoScreen from './src/Home/todoScreen';
import HomeScreen from './src/Home/homeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Todo"
          component={TodoScreen}
          options={{ title: 'Todo List' }}  // চাইলে এখানে custom title দিতে পারেন
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
