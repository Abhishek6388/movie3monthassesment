// // screens/PopularMoviesScreen.js
// import React, {useEffect, useState} from 'react';
// import {View, Text, FlatList, ActivityIndicator} from 'react-native';
// import axios from 'axios';

// const PopularMoviesScreen = () => {
//   const [popularMovies, setPopularMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       try {
//         const apiKey = '7a014bcf477861b5f7474f95072be060';
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
//         );
//         setPopularMovies(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching popular movies:', error);
//         setLoading(false);
//       }
//     };

//     fetchPopularMovies();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" />;
//   }

//   return (
//     <View>
//       <Text>Popular Movies</Text>
//       <FlatList
//         data={popularMovies}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({item}) => (
//           <Text>{item.title}</Text>
//           // Render additional movie details as needed
//         )}
//       />
//     </View>
//   );
// };

// export default PopularMoviesScreen;
import { View, Text } from 'react-native'
import React from 'react'

const Popularmovie = () => {
  return (
    <View>
      <Text>Popularmovie</Text>
    </View>
  )
}

export default Popularmovie