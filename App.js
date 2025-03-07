import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MeditationScreen from './src/screens/MeditationScreen';
import SleepSoundsScreen from './src/screens/SleepSoundsScreen';
import PlayerScreen from './src/screens/PlayerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E2E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sleep Meditation' }} 
        />
        <Stack.Screen 
          name="Meditation" 
          component={MeditationScreen}
          options={{ title: 'Guided Meditations' }}
        />
        <Stack.Screen 
          name="SleepSounds" 
          component={SleepSoundsScreen}
          options={{ title: 'Sleep Sounds' }}
        />
        <Stack.Screen 
          name="Player" 
          component={PlayerScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}