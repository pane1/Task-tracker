import 'react-native-gesture-handler';
import React,{useState, useEffect, useRef} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Platform, 
    StatusBar, 
    AsyncStorage
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import IconAD from "react-native-vector-icons/AntDesign";
import IconFA from "react-native-vector-icons/FontAwesome";


import Tab from "./Tab";
import Folder from "./Folder";
import Sort from "./SortMenu";
import { Animated } from 'react-native';

export default function Home({navigation, route}){  
  const [taskArray, setTaskArray] = useState([{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}]);
  const [index, setIndex] = useState(0);
  const [oldTask, setOldTask] = useState([{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}]);
  const isFocused = useIsFocused();

  let newIndex = 0;
  const [homeVis,setHomeVis] = useState("flex");
  const [regVis,setRegVis] = useState("none");
  const [sortView, setSortView] = useState(false);
  const [scrollHeight, setScrollHeight] = useState("100%");
  const [opac, setOpac] = useState(1);
  const [resetMenu, setReset] = useState(false);

  useEffect(() =>{
    if(route.params?.newTask && route.params?.newDate && route.params?.selectedColor && route.params?.visable){
      // alert(route.params?.newTask + " " + route.params?.newDate + " " + route.params?.selectedColor + " " + route.params?.visable);
      
      addTask(route.params?.newTask, route.params?.newDate, route.params?.selectedColor, route.params?.visable);
      // recentSort("flex","none");
    }
    else if(route.params?.startup){
      // alert("came from loading screen");
      retrieveAll();
    }
    
  },[route.params?.newTask,route.params?.newDate,route.params?.selectedColor,route.params?.visable,route.params?.startup,route.params?.startup]);

  const addTask = async(newTask, newDate, color, visable) =>{
    console.log("Task: " + newTask + " Date: " + newDate + " Color: " + color + " Visability: " + visable);
    const id = "ID_" + newTask + "_" + newDate;
    const newArray = {id: id, task: newTask, date: newDate, color: color, visable: visable};
    console.log(newArray);
    // await taskArray.push(newArray);
    if(await taskCheck(id)){
      alert("That task already exists.");
    }
    else{
      storeData(id,newArray);
      await setTaskArray([...taskArray, newArray]);
      
       await setOldTask([...oldTask, newArray]);
    }
  }

  const storeData = async(id, newArray) =>{
    try{
      console.log("ID: " + id);
      console.log(newArray);
      await AsyncStorage.setItem(id, JSON.stringify(newArray));
      // let indexStr = ''+index;
      // await AsyncStorage.setItem("Index", index);
      console.log("STORE SUCCESSFULL");
    }
    catch(error){
      alert("error storing data from AsyncStorage")
    }
  }
  const checkIndex = async() =>{
    try{
      var newIndex = await AsyncStorage.getItem("Index");
      setIndex(newIndex);
    }
    catch(error){
      alert("error with retrieveing index data");
    }
  }


  const retrieveAll = async() =>{
    try{
      
      const keys = await AsyncStorage.getAllKeys();
      const storedData = await AsyncStorage.multiGet(keys);
      console.log(storedData);
      let parseData = [];
      parseData.push({id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false})
      for(let i = 0; i < storedData.length; i++){
        data = JSON.parse(storedData[i][1]);
        console.log(data);
        parseData.push(data);
      }
      console.log("Retrieved all!");
      //console.log("Parse array: ", parseData);
      await setTaskArray(parseData);
      await setOldTask(parseData);
    }
    catch(error){
      alert("error with retrieveing all");
    }
  }
  const removeTask = async(key) =>{
    try{
      console.log("KEY: "+key);
      await AsyncStorage.removeItem(key);
      console.log("REMOVAL SUCCESSFUL");
      await retrieveAll();
    }
    catch(error){
      alert("error with removing task");
    }
  }
  const taskCheck = async(taskID) =>{
    try{

      const IDkeys = await AsyncStorage.getAllKeys();
      for(let i = 0; i < IDkeys.length; i++){
        if(IDkeys[i] == taskID){
          return true;
        }
      }
      return false;
    }
    catch(error){
      return true;
    }
  }
  const clearData = async() =>{
    AsyncStorage.clear();
  }
  const sortArray = async() =>{
    if(sortView == true){
      await setSortView(false);
      await setScrollHeight("100%");
      await setOpac(1);
      recentSort("flex", "none");
    }
    else if(sortView == false){
      await setSortView(true);
      await setScrollHeight("45%");

    }
  }

  const recentSort = async(upRecent, doRecent) =>{
    console.log("recent sorted!");
    try{
      if(taskArray.length >= 2){
        await setTaskArray(oldTask);
    
        if(upRecent == "none" && doRecent == "flex"){
          // console.log("Newly sorted: ",taskArray);
          // console.log("Recent Sort: (doRecent)", taskArray);
          await setTaskArray(oldTask);
    
          let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];
          // console.log("length: ", taskArray.length);
          for(let i = taskArray.length - 1; i > 0; i--){
            dummy.push(taskArray[i]);
    
          }
          await setTaskArray(dummy);
        }
      }
    }
    catch(error){
      console.log("error with recent sort.");
    }
  }
  const letterSort = async(upAlph, doAlph) =>{
    console.log("Alphabetical sort!");
    let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];

    const temp = [];

    for(let i = 1; i < taskArray.length; i++){
      temp.push(taskArray[i]);
    }
    // console.log("New Temp: ", temp);
    temp.sort((a, b) => (a.task > b.task) ? 1 : -1);
    // console.log("Sorted Temp: ", temp);
    
    for(let i = 0; i < temp.length; i++){
      dummy.push(temp[i]);
    }

    await setTaskArray(dummy);

    if(upAlph == "none" && doAlph == "flex"){
      let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];

      for(let i = temp.length - 1; i >= 0; i--){
        dummy.push(temp[i]);
      }
      
      await setTaskArray(dummy);
    }
  }
  const dateSort = async(upDate, doDate) =>{
    console.log("date sorted!");
    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];
    let tasks = taskArray;
    let holder = [];
    let reHolder = [];

    let temp = [];
    let smallest = 99;
    let smallestObj = "";

    // console.log("Tasks: ",tasks);

    try{
      if(taskArray.length >= 2){
        for(let j = 0; j < taskArray.length - 1; j++){
          let taskLength = tasks.length;
          
          // console.log("Tasks (pre-removal): ", tasks);
          for(let i = 1; i < tasks.length; i++){
            // console.log("i : " + i + " j: " + j);
            if(parseInt(tasks[i].date.substring(4,6)) < smallest){
              smallest = parseInt(tasks[i].date.substring(4,6));
              smallestObj = tasks[i];
            }
          }
          // console.log("smallest: ", smallestObj);
          holder.push(smallestObj);
          
          // console.log("Length of tasks: ", taskLength);
          for(let k = 0; k < taskLength; k++){
            if(tasks[k] != smallestObj){
              temp.push(tasks[k]);
            }
          }
          // console.log("Temp: ", temp);
          await (tasks = temp);
          await (smallest = 99);
          // console.log("Tasks (removal): ", tasks);
          temp = [];
          // console.log("Removed: ",tasks);
        }
        for(let i = 0; i < holder.length; i++){
          // console.log(holder[holder.length - i - 1]);
          reHolder.push(holder[holder.length - i - 1]);
        }
        for(let i = 0; i < Months.length; i++){
          for(let j = 0; j < holder.length; j++){
            if(Months[i] == holder[j].date.substring(0,3)){
              dummy.push(holder[j]);
            }
            // console.log(holder[j].date.substring(0,3));
          }
        }
        // console.log("Dummy: ", dummy);
        await setTaskArray(dummy);
        if(upDate == "none" && doDate == "flex"){
          let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];
          for(let i = Months.length - 1; i > 0; i--){
            for(let j = 0; j < reHolder.length; j++){
              if(Months[i] == reHolder[j].date.substring(0,3)){
                dummy.push(reHolder[j]);
              }
              // console.log(holder[j].date.substring(0,3));
            }
          }
          // console.log("dummy: ", dummy);
          await setTaskArray(dummy);
        }
      }
    }catch(error){
      console.log("error");
    }
    // console.log("Holder: ", holder);
    // console.log("Reverse Holder: ", reHolder);
    
  }
  const colorSort = async(upColor, doColor) =>{
    //red, orange, yellow, green, cyan, light blue, dark blue, purple, pink
    const taskColor = ["#fff","#eb4034", "#f58d38", "#f5df38", "#a0f538", "#38f5a6", "#38e8f5", "#3890f5", "#b638f5", "#f538b9"];
    let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];
    if(taskArray.length > 2){
      for(let i = 1; i < taskColor.length; i++){
        for(let j = 1; j < taskArray.length; j++){
          if(taskArray[j].color == taskColor[i]){
            dummy.push(taskArray[j]);
          }
        }
      }
      
      await setTaskArray(dummy);

      if(upColor == "none" && doColor == "flex"){
        // console.log("Color Sort: (doRecent)", taskArray);
        let dummy = [{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}];
        for(let i = taskColor.length - 1; i > 0; i--){
          for(let j = 1; j < taskArray.length; j++){
            if(taskArray[j].color == taskColor[i]){
              dummy.push(taskArray[j]);
            }
          }
        }
        await setTaskArray(dummy);
      }
    }
  }
  return(
    <SafeAreaView style = {style.container}>
      <View style = {style.extraHeight}>
      </View>
      <View style = {style.uiBar}>
        <TouchableOpacity style = {style.uiButton} onPress = {() => {navigation.navigate("Search")}}>
          <IconAD name = "search1" size = {35} color = "#fff"/>
        </TouchableOpacity>
        <TouchableOpacity style = {style.uiButton} onPress = {() => {sortArray()}}>
          <IconFA name = "unsorted" size = {35} color = "#fff"/>
        </TouchableOpacity>
        <TouchableOpacity style = {style.uiButton} onPress = {async() => {
            if(sortView == false){
              navigation.navigate("Register");
            }
            else if(sortView == true){
              alert("Currently in sort view, exit sort view to add new task.");
            }
          }}>
          <IconFA name = "plus-circle" size = {35} color = "#fff"/>
        </TouchableOpacity>
      </View>
      
      <ScrollView style = {[style.scrollframe,{display: homeVis, height: scrollHeight, opacity: opac}]}>
        <Text style = {style.title}>Tasks</Text>
        {/* <Folder/> */}
        <View>
            {taskArray.map(newEle => {
              return(
                <Tab key={newEle.id} task={newEle.task} date={newEle.date} color={newEle.color} visable={newEle.visable} remove={removeTask}/>
              )
            })}
        </View>
        
        
      </ScrollView>
      
      <Sort visable = {sortView} recent={recentSort} letter={letterSort} time={dateSort} color={colorSort}/>
    </SafeAreaView>
  );
    
}

//borderWidth: 1
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  scrollframe:{
    // borderWidth: 3, 
    // borderColor: "blue", 
  },
  extraHeight: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor: "white",
    
  },
  title: {
    fontSize: 30,
    paddingTop: "4%",
    alignSelf: "center"
  },
  addBtn: {
    alignSelf: "flex-end",
    margin: "5%"
  },
  uiBar: {
    height: "6%",
    width: "100%",
    backgroundColor: "black",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end"
    
  },
  uiButton: {
    // borderColor: "#fff",
    // borderWidth: 1,
    paddingTop: 4,
    marginRight: "3%"
    
  },
  uiButtonArea: {
    alignItems: "flex-end",
    width: 40,
    height: 40,
    borderColor: "#fff",
    borderWidth: 1
  }
});