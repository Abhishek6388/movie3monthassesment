import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import DrawerNavigator from '../../drawerContent/DrawerNavigator'

const Home = () => {
  return (
    <View  style={{ flex: 1 }}>

     <DrawerNavigator/>
     
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

  container:{
    flex: 1,
  }

})