import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const Favorite = ({ accountId }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]); // Explicitly set the type as any[] initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const apiKey = '7a014bcf477861b5f7474f95072be060'; // Replace with your TMDb API key
        const response = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch favorite movies');
        }

        const data = await response.json();
        setFavoriteMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [accountId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Favorite Movies
      </Text>
      {favoriteMovies.length === 0 ? (
        <Text>No favorite movies found.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={{ marginBottom: 8 }}>{item.title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default Favorite;
