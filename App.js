import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
  Linking,
} from 'react-native';

import {gyroscope, setUpdateIntervalForType} from 'react-native-sensors';

import Geolocation from 'react-native-geolocation-service';

setUpdateIntervalForType('gyroscope', 500);

const App = () => {
  const {SensorManager} = NativeModules;

  SensorManager.startLightSensor(500);

  const [light, setLight] = useState(0);
  const [gyro, setGyro] = useState({x: 0, y: 0, z: 0});
  const [bgColor, setBgColor] = useState('#FFF');
  const [textColor, setTextColor] = useState('#000');
  const [location, setLocation] = useState(null);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
    gyroscope.subscribe(({x, y, z}) => {
      setGyro({x, y, z});
    });
    DeviceEventEmitter.addListener('LightSensor', data => {
      setLight(data.light);
    });

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  useEffect(() => {
    if (light < 200) {
      setBgColor('#FFF');
      setTextColor('#000');
    } else if (light < 800) {
      setBgColor('#777');
      setTextColor('#FFF');
    } else if (light < 1000) {
      setBgColor('#333');
      setTextColor('#FFF');
    } else if (light > 1000) {
      setBgColor('#000');
      setTextColor('#FFF');
    }
  }, [light]);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: bgColor,
      }}>
      <Text
        style={{
          ...styles.text,
          color: textColor,
        }}>{`Light data: ${light.toFixed(2)}`}</Text>
      <Text
        style={{
          ...styles.text,
          color: textColor,
        }}>{`Gyro data: X: ${gyro.x.toFixed(2)} Y: ${gyro.y.toFixed(
        2,
      )} Z: ${gyro.z.toFixed(2)}`}</Text>
      <Text
        style={{
          ...styles.text,
          color: textColor,
        }}>{`Geolocation: Lat: ${
        location?.coords?.latitude.toFixed(3) || -1
      } Lon: ${location?.coords?.longitude.toFixed(3) || -1}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
