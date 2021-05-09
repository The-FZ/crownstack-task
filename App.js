import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import SongDetails from './SongDetails';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#123744',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Song Details" component={SongDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;