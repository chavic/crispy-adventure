import { Audio } from 'expo-av';

// In a real app, this would be a more robust system for managing audio resources
// For now, it's a simple demo with placeholder functionality

class AudioManager {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
    this.isLooping = false;
  }

  // Load a sound file
  async loadSound(resource) {
    // Unload any existing sound
    if (this.sound) {
      await this.unloadSound();
    }

    try {
      const { sound } = await Audio.Sound.createAsync(resource);
      this.sound = sound;
      return true;
    } catch (error) {
      console.error('Failed to load sound', error);
      return false;
    }
  }

  // Play the loaded sound
  async playSound() {
    if (!this.sound) return false;

    try {
      await this.sound.playAsync();
      this.isPlaying = true;
      return true;
    } catch (error) {
      console.error('Failed to play sound', error);
      return false;
    }
  }

  // Pause the current sound
  async pauseSound() {
    if (!this.sound) return false;

    try {
      await this.sound.pauseAsync();
      this.isPlaying = false;
      return true;
    } catch (error) {
      console.error('Failed to pause sound', error);
      return false;
    }
  }

  // Stop and unload the current sound
  async unloadSound() {
    if (!this.sound) return true;

    try {
      if (this.isPlaying) {
        await this.sound.stopAsync();
        this.isPlaying = false;
      }
      await this.sound.unloadAsync();
      this.sound = null;
      return true;
    } catch (error) {
      console.error('Failed to unload sound', error);
      return false;
    }
  }

  // Set looping state
  async setLooping(isLooping) {
    if (!this.sound) return false;

    try {
      await this.sound.setIsLoopingAsync(isLooping);
      this.isLooping = isLooping;
      return true;
    } catch (error) {
      console.error('Failed to set looping', error);
      return false;
    }
  }

  // Get current playback status
  async getStatus() {
    if (!this.sound) return null;

    try {
      return await this.sound.getStatusAsync();
    } catch (error) {
      console.error('Failed to get status', error);
      return null;
    }
  }
}

// Export a singleton instance
export default new AudioManager();