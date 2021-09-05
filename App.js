import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();

  const [text, setText] = useState('');

  const onSendMessage = () => {
    navigation.navigate('Details', {text});
  };

  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter a message"
            value={text}
            onChangeText={setText}
          />
        </View>
        <TouchableOpacity style={styles.buttonSend} onPress={onSendMessage}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Details = ({route}) => {
  const text = route?.params?.text || 'No text was written';

  return (
    <View style={styles.details}>
      <Text style={styles.messageTitle}>Mensagem enviada da outra tela:</Text>
      <Text style={styles.message}>{text}</Text>
    </View>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Atividade 2'}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{title: 'Atividade 2'}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    flex: 0.7,
    borderBottomWidth: 2,
    borderBottomColor: '#888',
  },
  homeScreen: {
    flex: 1,
    padding: 20,
  },
  homeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSend: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#3700B3',
    flex: 0.2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    padding: 20,
  },
  messageTitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  message: {
    fontSize: 18,
  },
});

export default App;
