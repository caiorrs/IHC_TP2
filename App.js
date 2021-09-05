import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [sumResult, setSumResult] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const onSum = () => {
    try {
      if (firstValue.length && secondValue.length) {
        setSumResult(Number(firstValue) + Number(secondValue));
      } else {
        throw new Error('Both values should ');
      }
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(
        'There was an error on the sum of these values, please check them and try again',
      );
    }
  };

  const onChangeFirstValue = newText => {
    setFirstValue(newText.replace(/\D/g, ''));
  };

  const onChangeSecondValue = newText => {
    setSecondValue(newText.replace(/\D/g, ''));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Atividade 1</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter a number"
              value={firstValue}
              onChangeText={onChangeFirstValue}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter a number"
              value={secondValue}
              onChangeText={onChangeSecondValue}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.resultContainer}>
            <Text
              style={errorMessage ? styles.errorMessage : styles.resultText}>
              {errorMessage ? errorMessage : sumResult}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onSum} style={styles.button}>
            <Text style={styles.buttonText}>SUM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
  },
  inputsContainer: {
    marginTop: 30,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#888',
    marginVertical: 10,
  },
  input: {
    textAlign: 'right',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  resultText: {
    fontSize: 24,
  },
  errorMessage: {
    fontSize: 16,
    color: '#F00',
  },
  buttonContainer: {
    marginVertical: 100,
  },
  button: {
    backgroundColor: '#841289',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default App;
