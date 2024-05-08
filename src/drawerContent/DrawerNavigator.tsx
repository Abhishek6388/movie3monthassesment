// DrawerNavigator.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Toprated from './drawerSceen/Toprated';
import Popularmovie from './drawerSceen/Popularmovie';
import UpcomingMovie from './drawerSceen/UpcomingMovie';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    // drawerContentOptions={{
    //   activeTintColor: '#7176fa',
    //   itemStyle: {marginVertical: 5},
    // }}
    >
      <Drawer.Screen
        name="Top Rated"
        component={Toprated}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Popular Movie"
        component={Popularmovie}
        options={{headerShown: false}}
      />
       <Drawer.Screen
        name="Upcoming Movie"
        component={UpcomingMovie}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
