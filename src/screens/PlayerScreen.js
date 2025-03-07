import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerScreen({ route, navigation }) {
  const { title, image, duration, description, type } = route.params;
  
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [timer, setTimer] = useState(null);

  // Load sound when component mounts
  useEffect(() => {
    // In a real app, you would load the actual audio file
    async function loadSound() {
      console.log('Loading Sound');
      // This is a dummy sound for demonstration
      const { sound } = await Audio.Sound.createAsync(
        // In a real app, you would use a real audio file
        // For now we're using a dummy audio file
        require('../../assets/silence.mp3')
      );
      sound.setIsLoopingAsync(type === 'sound'); // Loop for ambient sounds
      setSound(sound);
    }

    loadSound();

    // Set timer for meditation (not for infinite sounds)
    if (type === 'meditation') {
      // Parse duration and convert to seconds
      const durationMatch = duration.match(/(\d+)/);
      if (durationMatch) {
        const durationMinutes = parseInt(durationMatch[1]);
        const durationSeconds = durationMinutes * 60;
        setRemainingTime(formatTime(durationSeconds));
      }
    }

    // Unload sound when component unmounts
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Start/stop the timer
  const toggleTimer = (isPlaying) => {
    if (isPlaying && type === 'meditation') {
      // Parse the initial duration
      const durationMatch = duration.match(/(\d+)/);
      if (durationMatch) {
        const durationMinutes = parseInt(durationMatch[1]);
        const durationSeconds = durationMinutes * 60;
        
        let remainingSeconds = durationSeconds * (1 - progress);
        
        const timerInterval = setInterval(() => {
          if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            handlePlayPause(); // Stop playing when timer ends
            return;
          }
          
          remainingSeconds -= 1;
          setRemainingTime(formatTime(Math.round(remainingSeconds)));
          setProgress(1 - (remainingSeconds / durationSeconds));
        }, 1000);
        
        setTimer(timerInterval);
      }
    } else if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  // Handle play/pause
  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        console.log('Pausing Sound');
        await sound.pauseAsync();
        toggleTimer(false);
      } else {
        console.log('Playing Sound');
        await sound.playAsync();
        toggleTimer(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: image }}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          
          <View style={styles.controlsContainer}>
            {type === 'meditation' && (
              <View style={styles.progressContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={progress}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="rgba(255,255,255,0.3)"
                  thumbTintColor="#fff"
                  disabled={true}
                />
                <Text style={styles.timeText}>{remainingTime}</Text>
              </View>
            )}
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="arrow-back-circle" size={40} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={32} 
                  color="#fff" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="arrow-forward-circle" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  controlsContainer: {
    marginBottom: 40,
  },
  progressContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    marginHorizontal: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});