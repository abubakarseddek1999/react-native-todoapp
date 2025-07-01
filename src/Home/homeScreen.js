
import { Dimensions, ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const { height: screenHeight } = Dimensions.get('window');
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>WELCOME</Text>

        <Image
          source={require('../../assets/home.png')} // your image here
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.welcome}>Your Todo app</Text>
        <Text style={styles.description}>
          Todo will help you to stay organized and perform your tasks much faster.
        </Text>
        {/* <Link href="/todo" asChild> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Todo')}
          >

            <Text style={styles.buttonText}>Get Started</Text>


          </TouchableOpacity>
        {/* </Link> */}
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: Dimensions.get('window').height,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    marginTop: 30,
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
