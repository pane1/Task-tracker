import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform, StatusBar, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function Tab ({task, date, color, visable, remove}){  
  //red, orange, yellow, green, cyan, light blue, dark blue, purple, pink
  const taskColor = ["#fff","#eb4034", "#f58d38", "#f5df38", "#a0f538", "#38f5a6", "#38e8f5", "#3890f5", "#b638f5", "#f538b9"];
  var tabColor = color;
  var taskAssigned; 
  var dateAssigned;
  var displayFlag = "none";

  const [displayDele, setDisDele] = useState("none");
  const [opac, setOpac] = useState(color);
  const [border, setBorder] = useState(0);

  const id = "ID_"+task+"_"+date;

  if(task !== "" && date !== ""){
    taskAssigned = task.replace(/['"]+/g, '');
    dateAssigned = date.replace(/['"]+/g, '');
    
  }
  else{
    taskAssigned = task;
    dateAssigned = date;
  }
  if(visable !== false){
    displayFlag = "flex";
    // alert(task + " is visible");
  }
  const deleteState = async () =>{
    if(opac == color){
      await setOpac("grey");
      await setDisDele("flex");
      await setBorder(2);
    }
    else if(opac == "grey"){
      await setOpac(color);
      await setDisDele("none");
      await setBorder(0);
    }

    //remove(id);
  }
  //onPress = {() => alert("Color: "+ color + " Task: " + task + " Date: " + date + " visable: " + visable)}
  return(
    <View style = {{alignItems: "center"}}>
      <TouchableOpacity onLongPress={() => deleteState()}>
        <View style = {[style.statTabs, {backgroundColor: tabColor, display: displayFlag, backgroundColor: opac}]}>
            <Text style = {style.statTask}>{taskAssigned}</Text>
            <View style = {[style.space]}></View>
            <Text style = {style.statTrack}>{dateAssigned}</Text>
        </View>
      </TouchableOpacity>
      <View style = {[style.deleteArea, {display: displayDele}]}>
        <TouchableOpacity onPress = {() => remove(id)}>
          <Icon name="times-circle" size = {35}/>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: "2.5%",
    marginBottom: "2.5%",
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between'
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
  deleteArea: {
    alignItems: "center"
  }
});