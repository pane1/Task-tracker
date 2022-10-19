import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Image, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tab from './Components/Tab';
import Register from './Components/Register';
import Wait from './Components/Wait';
import Home from './Components/Home';
import Search from './Components/Search';

const Stack = createStackNavigator();

export default function App(){
  return(

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Load"
      screenOptions = {{
        gestureEnabled: true,
        safeAreaInsets: {top: 25},
        headerStyle: {backgroundColor: 'black', height: 75},
        headerTitleStyle: {fontSize: 30},
        headerTintColor: "white"
      }}>
        <Stack.Screen name="Load" component={Wait} options ={{title: 'Loading Screen', headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options ={{title: 'Listed Tasks', headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options ={{title: 'Register task', headerShown: false}}/>
        <Stack.Screen name="Search" component={Search} options ={{title: 'Search Screen', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  headerForceInset: { top: 'never', bottom: 'never' },
  container: {
    flex: 1,
    backgroundColor: "red"
  }
});

