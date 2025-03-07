import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

// Sample data - in a real app, this would come from an API or database
const meditationsData = [
  {
    id: '1',
    title: 'Deep Sleep Journey',
    duration: '20 min',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022',
    description: 'A gentle guided meditation to help you fall into a deep, restful sleep.'
  },
  {
    id: '2',
    title: 'Bedtime Relaxation',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1455642305367-68834a9d4469?q=80&w=2070',
    description: 'Release the tension of the day and prepare your body for sleep.'
  },
  {
    id: '3',
    title: 'Stress Relief',
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1645376175554-9b086bbcdef3?q=80&w=2070',
    description: 'Clear your mind of worries and find peaceful sleep.'
  },
  {
    id: '4',
    title: 'Body Scan Meditation',
    duration: '18 min',
    image: 'https://images.unsplash.com/photo-1598387181942-6ee447a3a547?q=80&w=2076',
    description: 'Scan through your body to release tension and prepare for deep sleep.'
  },
  {
    id: '5',
    title: 'Mindful Breathing',
    duration: '8 min',
    image: 'https://images.unsplash.com/photo-1636638197271-22d21ed9eac4?q=80&w=2127',
    description: 'Focus on your breath to quiet your mind and induce sleep.'
  },
];

export default function MeditationScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.meditationItem}
      onPress={() => navigation.navigate('Player', { 
        title: item.title,
        image: item.image,
        duration: item.duration,
        description: item.description,
        type: 'meditation'
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.meditationImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.meditationOverlay}>
          <Text style={styles.meditationTitle}>{item.title}</Text>
          <Text style={styles.meditationDuration}>{item.duration}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={meditationsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
  },
  list: {
    padding: 16,
  },
  meditationItem: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  meditationImage: {
    height: 180,
    justifyContent: 'flex-end',
  },
  meditationOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
  },
  meditationTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meditationDuration: {
    color: '#ccc',
    fontSize: 14,
  },
});