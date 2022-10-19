import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    TouchableHighlight,
    Platform, 
    StatusBar, 
    AsyncStorage,
    Animated
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import IconF from "react-native-vector-icons/Feather";
import { color } from 'react-native-elements/dist/helpers';

export default function SortMenu({visable, recent, letter, time, color}){  
  const [displayOn, setDisplay] = useState("none");

  const [upRecent, setUpRecent] = useState("none");
  const [doRecent, setDoRecent] = useState("flex");

  const [upAlph, setUpAlph] = useState("none");
  const [doAlph, setDoAlph] = useState("none");

  const [upDate, setUpDate] = useState("none");
  const [doDate, setDoDate] = useState("none");

  const [upColor, setUpColor] = useState("none");
  const [doColor, setDoColor] = useState("none");
  useEffect(() => {
    if(visable){
      setDisplay("flex");
      // alert("display");
    }
    else if(visable == false){
      setUpRecent("none");
      setDoRecent("flex");

      setUpAlph("none");
      setDoAlph("none");
      
      setUpDate("none");
      setDoDate("none");

      setUpColor("none")
      setDoColor("none");
    }
  })
  const toggleRecent = async() =>{
    if(upRecent == "flex" && doRecent == "none"){
      await setUpRecent("none");
      await setDoRecent("flex");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpDate("none");
      await setDoDate("none");

      await setUpColor("none")
      await setDoColor("none");

      await recent(upRecent, doRecent);
    }
    else if(upRecent == "none" && doRecent == "flex"){
      await setUpRecent("flex");
      await setDoRecent("none");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpDate("none");
      await setDoDate("none");
      
      await setUpColor("none")
      await setDoColor("none");

      await recent(upRecent, doRecent);
    }
    else if(upRecent == "none" && doRecent == "none"){
      await setUpRecent("none");
      await setDoRecent("flex");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpDate("none");
      await setDoDate("none");
      
      await setUpColor("none")
      await setDoColor("none");

      await recent(upRecent, doRecent);
    }
  }
  const toggleAlph = async() =>{
    if(upAlph == "flex" && doAlph == "none"){
      await setUpAlph("none");
      await setDoAlph("flex");

      await setUpRecent("none");
      await setDoRecent("none");

      await setUpDate("none");
      await setDoDate("none");
    
      await setUpColor("none")
      await setDoColor("none");

      await letter(upAlph, doAlph);
    }
    else if(upAlph == "none" && doAlph == "flex"){
      await setUpAlph("flex");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");
      
      await setUpDate("none");
      await setDoDate("none");

      await setUpColor("none")
      await setDoColor("none");

      await letter(upAlph, doAlph);
    }
    else if(upAlph == "none" && doAlph == "none"){
      await setUpAlph("none");
      await setDoAlph("flex");
      
      await setUpRecent("none");
      await setDoRecent("none");
      
      await setUpDate("none");
      await setDoDate("none");     
      
      await setUpColor("none")
      await setDoColor("none");

      await letter(upAlph, doAlph);
    }
  }
  const toggleDate = async() =>{
    if(upDate == "flex" && doDate == "none"){
      await setUpDate("none");
      await setDoDate("flex");

      await setUpAlph("none");
      await setDoAlph("none");

      await setUpRecent("none");
      await setDoRecent("none");

      await setUpColor("none")
      await setDoColor("none");

      await time(upDate, doDate);
    }
    else if(upDate == "none" && doDate == "flex"){
      await setUpDate("flex");
      await setDoDate("none");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");
      
      await setUpColor("none")
      await setDoColor("none");

      await time(upDate, doDate);
    }
    else if(upDate == "none" && doDate == "none"){
      await setUpDate("none");
      await setDoDate("flex");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");
      
      await setUpColor("none")
      await setDoColor("none");

      await time(upDate, doDate);
    }
  }
  const toggleColor = async() =>{
    if(upColor == "flex" && doColor == "none"){
      await setUpColor("none")
      await setDoColor("flex");

      await setUpDate("none");
      await setDoDate("none");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");

      await color(upColor, doColor);
    }
    else if(upColor == "none" && doColor == "flex"){
      await setUpColor("flex")
      await setDoColor("none");

      await setUpDate("none");
      await setDoDate("none");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");

      await color(upColor, doColor);
    }
    else if(upColor == "none" && doColor == "none"){
      await setUpColor("none")
      await setDoColor("flex");

      await setUpDate("none");
      await setDoDate("none");

      await setUpAlph("none");
      await setDoAlph("none");
      
      await setUpRecent("none");
      await setDoRecent("none");

      await color(upColor, doColor);
    }
  }
  return(
  <View style = {[style.container, {display: displayOn}]}>

      <View style = {style.menuTitle}>
          <Text style = {[style.title,{paddingTop: 7}]}>Sort By</Text>
      </View>

      <View style = {style.menu}> 

        <TouchableOpacity style = {style.menuOption} onPress = {() => {toggleRecent();}}>
          <IconF name = "chevrons-down" size = {22} color = {"red"} style = {{display: doRecent}}/>
          <IconF name = "chevrons-up" size = {22} color = {"red"} style = {{display: upRecent}}/>
          <Text style = {style.options}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {style.menuOption} onPress = {() => {toggleAlph();}}>
          <IconF name = "chevrons-down" size = {22} color = {"red"} style = {{display: doAlph}}/>
          <IconF name = "chevrons-up" size = {22} color = {"red"} style = {{display: upAlph}}/>
          <Text style = {style.options}>Alphabetically</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {style.menuOption} onPress = {() => {toggleDate();}}>
          <IconF name = "chevrons-down" size = {22} color = {"red"} style = {{display: doDate}}/>
          <IconF name = "chevrons-up" size = {22} color = {"red"} style = {{display: upDate}}/>
          <Text style = {style.options}>Date of task</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {style.menuOption} onPress = {() => {toggleColor();}}>
          <IconF name = "chevrons-down" size = {22} color = {"red"} style = {{display: doColor}}/>
          <IconF name = "chevrons-up" size = {22} color = {"red"} style = {{display: upColor}}/>
          <Text style = {style.options}>Color of task</Text>
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
    alignSelf: "center",
    width: "100%",
    height: "60%",
    // borderColor: "red",
    // borderWidth: 3,
  },
  scrollframe:{
  },
  extraHeight: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    
  },
  options:{
    fontSize: 18
  },
  menuTitle:{
    height: "25%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 2,

  },
  menuOption: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "1.5%",

    //  borderWidth: 1
  },
  menu:{

    height: "100%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 2,

  },
});