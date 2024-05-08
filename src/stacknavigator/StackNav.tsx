import {
  TouchableOpacity,
  Image,
  Modal,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Splash from './stackScreens/Splash';
import Home from './stackScreens/Home';
import MovieScreen from './stackScreens/MovieScreen';
import TVShowScreen from './stackScreens/TVShowScreen';
import SubscribeScreen from './stackScreens/Subscribe';
import Favorite from './stackScreens/Favroite';
import DrawerNavigator from '../drawerContent/DrawerNavigator';
import Signup from './stackScreens/Signup';
import Login from './stackScreens/Login';

const Stack = createStackNavigator();

const MovieHeader = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleOpenDrawerNavigator = () => {
  //   navigation.navigate('Home');
  // };
  // const handleOpenDrawerNavigator = () => {
  //   navigation.openDrawer(); // This will open the drawer navigation
  // };

  const handleOpenDrawerNavigator = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={handleOpenDrawerNavigator}>
        <Image
          source={require('../assets/coq.png')}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your Popup Content Here</Text>
            {/* <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity> <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Top Rated</Text>
            </TouchableOpacity> <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Popular Movie</Text>
            </TouchableOpacity> <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Upcoming Movie</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Movie"
          component={MovieScreen}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: 'Movie',
            headerLeft: () => (
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => navigation.goBack()}>
                <Image
                  source={require('../assets/va.png')}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            ),
            headerRight: () => <MovieHeader />,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: 'black',
          })}
        />
        <Stack.Screen
          name="TVShow"
          component={TVShowScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Subscribe"
          component={SubscribeScreen}
          options={{
            headerShown: true,
            presentation: 'modal',
            cardStyle: {backgroundColor: 'transparent'},
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
  },
});

export default StackNavigator;
