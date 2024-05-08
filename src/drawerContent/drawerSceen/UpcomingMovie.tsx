// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import axios from 'axios';

// interface Movie {
//   id: number;
//   title: string;
//   release_date: string;
//   vote_average: number;
//   genre_ids: number[];
//   poster_path: string;
//   videoUrl: string;
//   overview: string;
// }

// const UpcomingMoviesScreen = () => {
//   const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUpcomingMovies = async () => {
//       try {
//         const apiKey = '7a014bcf477861b5f7474f95072be060';
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
//         );
//         setUpcomingMovies(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching upcoming movies:', error);
//         setLoading(false);
//       }
//     };

//     fetchUpcomingMovies();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upcoming Movies</Text>
//       <FlatList
//         data={upcomingMovies}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => (
//           <View style={styles.movieContainer}>
//             <Image
//               source={{
//                 uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//               }}
//               style={styles.poster}
//             />
//             <Text style={styles.movieTitle}>{item.title}</Text>
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
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   poster: {
//     width: 100,
//     height: 150,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   movieTitle: {
//     fontSize: 18,
//     flex: 1,
//   },
// });

// export default UpcomingMoviesScreen;
import { View, Text } from 'react-native'
import React from 'react'

const UpcomingMovie = () => {
  return (
    <View>
      <Text>UpcomingMovie</Text>
    </View>
  )
}

export default UpcomingMovie