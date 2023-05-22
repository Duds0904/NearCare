import { View, TouchableOpacity, Text, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

import { styles } from './styles';

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);

      console.log("LOCALIZAÇÃO ATUAL =>", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          pitch: 40,
          center: response.coords
        });
      }
    );
  }, []);

  const handleSearchButtonPress = () => {
    setButtonVisible(false);
    if (mapRef.current) {
      const initialRegion = {
        latitude: location?.coords.latitude || 0,
        longitude: location?.coords.longitude || 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      };
      mapRef.current.animateToRegion(initialRegion, 1000);
    }
    setTimeout(() => {
      setButtonVisible(true);
    }, 3000);
  };

  const handleButtonPressIn = () => {
    Animated.spring(pulseAnimation, {
      toValue: 0.2,
      useNativeDriver: true
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(pulseAnimation, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    const pulseAnimationConfig = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1300,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1300,
          useNativeDriver: true
        })
      ])
    );

    if (buttonVisible) {
      pulseAnimationConfig.start();
    } else {
      pulseAnimationConfig.stop();
      pulseAnimation.setValue(1);
    }

    Animated.timing(fadeAnimation, {
      toValue: buttonVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [buttonVisible]);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
          />
        </MapView>
      )}
      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: fadeAnimation, transform: [{ scale: pulseAnimation }] }
        ]}
      >
        {buttonVisible && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleSearchButtonPress}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};