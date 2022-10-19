import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function EmptyTab (){  

  return(
    <TouchableOpacity>
      <Text>Empty</Text>
    </TouchableOpacity>
  );
  
}
//borderWidth: 1
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    width: "100%",
    borderWidth: 1
  },
  extraHeight: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    paddingTop: "5%"
  },
  statTabs: {
    width: "90%",
    margin: "5%",
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
   
  },
  statTask: {
    width: "60%",
    margin: "5%",
    marginRight: "0%",
    fontSize: 25,

  },
  statTrack: {
    width: "30%",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
 
  },
  space: {
    width: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    borderRightWidth: 2,
  },

});