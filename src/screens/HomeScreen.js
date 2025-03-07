import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2072' }}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SleepMedi</Text>
          <Text style={styles.subtitle}>Better sleep, every night</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Meditation')}
          >
            <Text style={styles.buttonText}>Guided Meditations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SleepSounds')}
          >
            <Text style={styles.buttonText}>Sleep Sounds</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginBottom: 60,
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});