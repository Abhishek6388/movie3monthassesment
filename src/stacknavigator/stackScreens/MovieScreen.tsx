import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string;
  overview: string;
  videoUrl: string;
}

const MovieScreen: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [showOverviewModal, setShowOverviewModal] = useState<boolean>(false);
  const [selectedOverview, setSelectedOverview] = useState<string>('');
  const [showYearPicker, setShowYearPicker] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showRatingPicker, setShowRatingPicker] = useState<boolean>(false);
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(
    null,
  );

  const navigation = useNavigation();
  const apiKey = '7a014bcf477861b5f7474f95072be060'; // Replace with your MovieDB API key
  const apiUrlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const apiUrlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
  const apiUrlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          popularMoviesResponse,
          upcomingMoviesResponse,
          topRatedMoviesResponse,
        ] = await Promise.all([
          fetch(apiUrlPopularMovies).then(response => response.json()),
          fetch(apiUrlUpcomingMovies).then(response => response.json()),
          fetch(apiUrlTopRatedMovies).then(response => response.json()),
        ]);

        setPopularMovies(mapMoviesWithVideoUrl(popularMoviesResponse.results));
        setUpcomingMovies(
          mapMoviesWithVideoUrl(upcomingMoviesResponse.results),
        );
        setTopRatedMovies(
          mapMoviesWithVideoUrl(topRatedMoviesResponse.results),
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapMoviesWithVideoUrl = (movies: any[]): Movie[] => {
    return movies.map(movie => ({
      ...movie,
      videoUrl: `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`,
      overview: movie.overview,
    }));
  };

  const handleMoviePress = async (movie: Movie) => {
    try {
      const response = await fetch(movie.videoUrl);
      const data = await response.json();
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        const trailer = data.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube',
        );
        if (trailer) {
          const videoUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
          Linking.openURL(videoUrl);
        } else {
          console.error('No trailer found for the movie.');
        }
      } else {
        console.error('Invalid response format from API.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleShowOverview = (overview: string) => {
    setSelectedOverview(overview);
    setShowOverviewModal(true);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    // Filter popular movies
    const filteredPopular = popularMovies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase()),
    );

    // Filter upcoming movies
    const filteredUpcoming = upcomingMovies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase()),
    );

    // Filter top rated movies
    const filteredTopRated = topRatedMovies.filter(movie =>
      movie.title.toLowerCase().includes(text.toLowerCase()),
    );

    // Combine all filtered movies
    const filteredMovies = [
      ...filteredPopular,
      ...filteredUpcoming,
      ...filteredTopRated,
    ];

    setFilteredMovies(filterByMinRating(filteredMovies));
  };

  const handleYearPicker = () => {
    setShowYearPicker(true);
  };

  const selectYear = (year: string) => {
    setSelectedYear(year);
    setShowYearPicker(false);
    filterMoviesByYear(year);
  };

  const filterMoviesByYear = (year: string) => {
    const filteredPopular = popularMovies.filter(
      movie => movie.release_date && movie.release_date.startsWith(year),
    );

    const filteredUpcoming = upcomingMovies.filter(
      movie => movie.release_date && movie.release_date.startsWith(year),
    );

    const filteredTopRated = topRatedMovies.filter(
      movie => movie.release_date && movie.release_date.startsWith(year),
    );

    const filteredMovies = [
      ...filteredPopular,
      ...filteredUpcoming,
      ...filteredTopRated,
    ];
    setFilteredMovies(filterByMinRating(filteredMovies));
  };

  const filterByMinRating = (movies: Movie[]): Movie[] => {
    if (selectedMinRating !== null) {
      // Filter movies based on the selected minimum rating
      const filteredMovies = movies.filter(
        movie => movie.vote_average >= selectedMinRating,
      );

      // Sort filtered movies by descending vote_average (rating)
      return filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
    }
    return movies; // Return original list if no rating is selected
  };

  const handleRatingChange = (rating: number) => {
    setSelectedMinRating(rating);
    setShowRatingPicker(false);
    setFilteredMovies(filterByMinRating(filteredMovies));
  };

  const renderRatingButton = (rating: number) => (
    <TouchableOpacity
      key={rating}
      style={[
        styles.ratingButton,
        selectedMinRating === rating && styles.selectedRatingButton,
      ]}
      onPress={() => handleRatingChange(rating)}>
      <Text style={styles.ratingButtonText}>{rating}</Text>
    </TouchableOpacity>
  );

  let moviesToDisplay;

  if (filteredMovies.length > 0) {
    moviesToDisplay = filteredMovies;
  } else if (selectedYear && selectedYear !== '') {
    const filteredByYear = [
      ...popularMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
      ...upcomingMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
      ...topRatedMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
    ];
    moviesToDisplay = filterByMinRating(filteredByYear);
  } else {
    moviesToDisplay = popularMovies;
  }
  const renderMovieItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => handleMoviePress(item)}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}
        style={styles.posterImage}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.infoText}>{item.release_date}</Text>
      <Text style={styles.infoText}>Rating: {item.vote_average}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleShowOverview(item.overview)}>
        <Text style={[styles.infoText, {color: 'blue'}]}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );



// --------------------------------------------------rating-----------------------------------------------



  if (filteredMovies.length > 0) {
    moviesToDisplay = filterByMinRating(filteredMovies);
  } else if (selectedYear && selectedYear !== '') {
    const filteredByYear = [
      ...popularMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
      ...upcomingMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
      ...topRatedMovies.filter(
        movie =>
          movie.release_date && movie.release_date.startsWith(selectedYear),
      ),
    ];
    moviesToDisplay = filterByMinRating(filteredByYear);
  }

  // Sort movies based on selected minimum rating
  if (selectedMinRating !== null) {
    moviesToDisplay = moviesToDisplay.filter(
      movie => movie.vote_average >= selectedMinRating,
    );
    // Sort by descending vote_average (rating)
    moviesToDisplay.sort((a, b) => b.vote_average - a.vote_average);
  }



// ------------------------------------------------------return--------------------------------------------------------------


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search movies..."
            placeholderTextColor="gray"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sortButtonContainer}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={handleYearPicker}>
            <Text style={styles.sortButtonText}>
              {selectedYear ? selectedYear : 'Select Year'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowRatingPicker(true)}>
            <Text style={styles.sortButtonText}>Filter by Rating</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showYearPicker}
          onRequestClose={() => setShowYearPicker(false)}>
          <View style={styles.yearPickerContainer}>
            <ScrollView>
              {[...Array(100).keys()].map((_, index) => {
                const year = 2024 - index;
                return (
                  <TouchableOpacity
                    key={year}
                    style={styles.yearItem}
                    onPress={() => selectYear(year.toString())}>
                    <Text style={styles.yearText}>{year}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showRatingPicker}
          onRequestClose={() => setShowRatingPicker(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.ratingPickerContainer}>
              <Text style={styles.modalTitle}>Select Minimum Rating</Text>
              <View style={styles.ratingButtonsContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating =>
                  renderRatingButton(rating),
                )}
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showOverviewModal}
          onRequestClose={() => setShowOverviewModal(false)}>
          <TouchableWithoutFeedback onPress={() => setShowOverviewModal(false)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Overview</Text>
                <ScrollView>
                  <Text style={styles.modalText}>{selectedOverview}</Text>
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {moviesToDisplay.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {selectedYear && selectedYear !== ''
                ? `Movies Released in ${selectedYear}`
                : 'Filter Movies'}
            </Text>
            <FlatList
              horizontal
              data={moviesToDisplay}
              keyExtractor={item => item.id.toString()}
              renderItem={renderMovieItem}
            />
          </>
        )}

        {popularMovies.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Popular Movies</Text>
            <FlatList
              horizontal
              data={popularMovies}
              keyExtractor={item => item.id.toString()}
              renderItem={renderMovieItem}
            />
          </>
        )}

        {upcomingMovies.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Upcoming Movies</Text>
            <FlatList
              horizontal
              data={upcomingMovies}
              keyExtractor={item => item.id.toString()}
              renderItem={renderMovieItem}
            />
          </>
        )}

        {topRatedMovies.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Top Rated Movies</Text>
            <FlatList
              horizontal
              data={topRatedMovies}
              keyExtractor={item => item.id.toString()}
              renderItem={renderMovieItem}
            />
          </>
        )}

        {moviesToDisplay.length === 0 && (
          <Text style={styles.emptyMessage}>No movies available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'gray',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 25,
  },
  movieItem: {
    width: 200,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  posterImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    color: 'white',
    marginBottom: 4,
  },
  detailsButton: {
    top: 0,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxHeight: '80%',
    width: '90%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  sortButtonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sortButton: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  yearPickerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearItem: {
    padding: 16,
  },
  yearText: {
    fontSize: 18,
    color: 'white',
  },
  ratingButton: {
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedRatingButton: {
    backgroundColor: 'blue',
  },
  ratingButtonText: {
    color: 'white',
  },
  ratingPickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    maxHeight: '50%',
    width: '80%',
    alignItems: 'center',
  },
  ratingButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  emptyMessage: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default MovieScreen;
