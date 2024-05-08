import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from 'react-native';

interface TVShow {
  id: number;
  name: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
}

const TVShowScreen: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [selectedTVShow, setSelectedTVShow] = useState<TVShow | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const apiKey = '7a014bcf477861b5f7474f95072be060'; // Replace with your MovieDB API key

  const apiUrlPopularTVShows = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

  useEffect(() => {
    fetchPopularTVShows();
  }, []);

  const fetchPopularTVShows = async () => {
    try {
      const response = await fetch(apiUrlPopularTVShows);
      const data = await response.json();

      if (response.ok) {
        setTVShows(data.results);
      } else {
        console.error('Failed to fetch popular TV shows');
      }
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoUrl = async (tvShowId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/videos?api_key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const trailer = data.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        if (trailer) {
          setSelectedVideoUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          console.error('No trailer found for the TV show');
          // If no trailer, provide an option to search on YouTube
          setSelectedVideoUrl(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(
              selectedTVShow?.name + ' trailer'
            )}`
          );
        }
      } else {
        console.error('No video results found for the TV show');
        // If no video results, provide an option to search on YouTube
        setSelectedVideoUrl(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            selectedTVShow?.name + ' trailer'
          )}`
        );
      }
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
  };

  const handleTVShowPress = async (tvShow: TVShow) => {
    setSelectedTVShow(tvShow);
    setShowDetailsModal(true);
    await fetchVideoUrl(tvShow.id);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tvShowItem}
              onPress={() => handleTVShowPress(item)}
            >
              <Text style={styles.title}>{item.name}</Text>
              {item.poster_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={styles.posterImage}
                  resizeMode="cover"
                />
              ) : (
                <Text>No Poster Available</Text>
              )}
              <Text>First Air Date: {item.first_air_date}</Text>
              <Text>Rating: {item.vote_average}/10</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {showDetailsModal && selectedTVShow && (
        <Modal animationType="slide" visible={showDetailsModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedTVShow.name}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${selectedTVShow.poster_path}`,
              }}
              style={styles.modalPoster}
              resizeMode="cover"
            />
            <Text>First Air Date: {selectedTVShow.first_air_date}</Text>
            <Text>Rating: {selectedTVShow.vote_average}/10</Text>
            {selectedVideoUrl && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => Linking.openURL(selectedVideoUrl)}
              >
                <Text style={styles.playButtonText}>Play Trailer</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetailsModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  tvShowItem: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  posterImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalPoster: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TVShowScreen;
