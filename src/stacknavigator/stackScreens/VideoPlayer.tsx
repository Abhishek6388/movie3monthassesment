import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const handleLoad = (data: OnLoadData) => {
    console.log('Video duration:', data.duration);
  };

  return (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.videoPlayer}
        controls={true}
        resizeMode="contain"
        onLoad={handleLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
});

export default VideoPlayer;
