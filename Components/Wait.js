
import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  AsyncStorage,
} from 'react-native';


export default class Wait extends React.Component{
  
  componentDidMount(){
    this.props.navigation.navigate("Home", {startup: 1});
  }

  render(){
    return(
      <View style = {style.container}>
        <Text>This screen is a screen that loads in the main screen.</Text>
        <TouchableOpacity style = {style.btn} onPress = {() => this.props.navigation.navigate("Home",{returnTask: "", returnDate: ""})}>
          <Text style = {style.btnText}>Go to main screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  btn: {
    backgroundColor: "black",
    borderRadius: 16,
    margin: "5%",
    width: "90%",
    height: "10%"
  },
  btnText: {
    color: "#fff",
    margin: "5%",
    fontSize: 30,
    textAlign: "center"
  }
});