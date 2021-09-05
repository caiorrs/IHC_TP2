import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {
  setUpdateIntervalForType,
  SensorTypes,
  accelerometer,
} from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 300);

const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();

  const [xAccel, setXAccel] = useState('');
  const [yAccel, setYAccel] = useState('');
  const [zAccel, setZAccel] = useState('');

  useEffect(() => {
    accelerometer.subscribe(({x, y, z}) => {
      setXAccel(x.toFixed(3));
      setYAccel(y.toFixed(3));
      setZAccel(z.toFixed(3));
    });
  }, []);

  useEffect(() => {
    if (Math.abs(xAccel) > 100) {
      navigation.navigate('Details', {
        text: 'You have reached 100g acceleration on x axis, are you Chuck Norris?',
      });
    } else if (Math.abs(xAccel) > 30) {
      navigation.navigate('Details', {
        text: 'You have reached 30g acceleration on x axis, be careful',
      });
    } else if (Math.abs(xAccel) > 10) {
      navigation.navigate('Details', {
        text: 'You have reached 10g acceleration on x axis, awesome',
      });
    } else if (Math.abs(xAccel) > 5) {
      navigation.navigate('Details', {
        text: 'You have reached 5g acceleration on x axis',
      });
    }
  }, [xAccel]);

  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={`X: ${xAccel}`}
            onChangeText={() => {}}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={`Y: ${yAccel}`}
            onChangeText={() => {}}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={`Z: ${zAccel}`}
            onChangeText={() => {}}
            style={styles.input}
          />
        </View>
      </View>
      <Text style={styles.instructions}>
        Try to get the most acceleration possible on X axis (when ponrtrait) to
        view a hidden message. Try spinning in place.
      </Text>
    </View>
  );
};

const Details = ({route}) => {
  const text = route?.params?.text || 'No text was written';

  return (
    <View style={styles.details}>
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
        options={{title: 'Atividade 3'}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{title: 'Atividade 3'}}
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
  input: {
    color: '#000',
  },
  instructions: {
    marginVertical: 20,
    fontSize: 16,
  },
});

export default App;
