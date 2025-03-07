import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';

// Sample data
const soundsData = [
  {
    id: '1',
    title: 'Gentle Rain',
    duration: '∞',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2070',
    description: 'Calming rain sounds to help you drift off to sleep.'
  },
  {
    id: '2',
    title: 'Ocean Waves',
    duration: '∞',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073',
    description: 'Rhythmic ocean waves for a peaceful night's sleep.'
  },
  {
    id: '3',
    title: 'Night Forest',
    duration: '∞',
    image: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=2074',
    description: 'Immerse yourself in the gentle sounds of a nighttime forest.'
  },
  {
    id: '4',
    title: 'White Noise',
    duration: '∞',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2070',
    description: 'Consistent white noise to block out distractions and enhance sleep.'
  },
  {
    id: '5',
    title: 'Calm Stream',
    duration: '∞',
    image: 'https://images.unsplash.com/photo-1444090695923-48e08781a76a?q=80&w=2070',
    description: 'The peaceful sound of a gently flowing stream.'
  },
];

export default function SleepSoundsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.soundItem}
      onPress={() => navigation.navigate('Player', { 
        title: item.title,
        image: item.image,
        duration: item.duration,
        description: item.description,
        type: 'sound'
      })}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.soundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.soundOverlay}>
          <Text style={styles.soundTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={soundsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
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
    padding: 8,
  },
  soundItem: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  soundImage: {
    height: 150,
    justifyContent: 'flex-end',
  },
  soundOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  soundTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});