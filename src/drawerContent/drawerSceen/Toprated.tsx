// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import axios from 'axios';

// interface Movie {
//   id: number;
//   title: string;
//   release_date: string;
//   // Add other movie properties here as needed
// }

// const TopRatedMoviesScreen = () => {
//   const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopRatedMovies = async () => {
//       try {
//         const apiKey = '7a014bcf477861b5f7474f95072be060';
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
//         );
//         setTopRatedMovies(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching top rated movies:', error);
//         setLoading(false);
//       }
//     };

//     fetchTopRatedMovies();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Top Rated Movies</Text>
//       <FlatList
//         data={topRatedMovies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.movieContainer}>
//             <Text style={styles.movieTitle}>{item.title}</Text>
//             <Text style={styles.releaseDate}>{item.release_date}</Text>
//             {/* Render additional movie details as needed */}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   movieContainer: {
//     marginBottom: 20,
//   },
//   movieTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   releaseDate: {
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default TopRatedMoviesScreen;
import { View, Text } from 'react-native'
import React from 'react'

const TopRated = () => {
  return (
    <View>
      <Text>TopRated</Text>
    </View>
  )
}

export default TopRated