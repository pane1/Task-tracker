import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign';

import Register from "./Register";
import Tab from "./Tab";
import Empty from "./EmptyTab";
import { TextInput } from 'react-native';

export default function Search({navigation, route}){  
const [taskArray, setTaskArray] = useState([{id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false}]);

const [search,setSearch] = useState("");
const [btnDisplay, setDisplay] = useState("none");
const [inputValue, setInput] = useState("");

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
        //console.log("Parse array: ", parseData);
        await setTaskArray(parseData);
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

const searchData = async() =>{
    try{
        const keys = await AsyncStorage.getAllKeys();
        let taskFromStorage = [];
        let monthFromStorage = [];
        let dayFromStorage = [];

        //splitting the tasks
        for(let i = 0; i < keys.length; i++){
            let splitName = keys[i].split("_");
            taskFromStorage.push(splitName[1]);

            let dateSplit = splitName[2].split("/");
         
            monthFromStorage.push(monthConvert(dateSplit[0]));
            //monthFromStorage.push(dateSplit[0]);
            dayFromStorage.push(parseInt(dateSplit[1]));
        }

        let corrKeys = [];

        for(let i = 0; i < keys.length; i++){
            if(taskFromStorage[i].includes(search)){
                corrKeys.push(keys[i]);
            }
            else if(monthFromStorage[i].includes(search)){
                corrKeys.push(keys[i]);
            }
            else if(dayFromStorage[i] == search){
                corrKeys.push(keys[i]);
            }
        }
        // for(let i = 0; i < keys.length; i++){
        //     console.log(keys[i]);
        //     console.log(keys[i].includes(search));
        // }
        console.log("Tasks taken from storage: ", taskFromStorage);
        console.log("Months taken from storage: ", monthFromStorage);
        console.log("Days taken from storage: ", dayFromStorage);
        console.log("Search item: " + search);
        console.log("Found corresponding item: " + corrKeys);
        updateTasks(corrKeys);
    }
    catch(error){
        alert("error with searchData()");
    }
}
const monthConvert = (month) =>{
    let monthsU = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthsL = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    switch(month){
        case "Jan":
            return monthsU[0] + " " + monthsL[0] + " " + month;
            break;
        case "Feb":
            return monthsU[1] + " " + monthsL[1] + " " + month;
            break;
        case "Mar":
            return monthsU[2] + " " + monthsL[2] + " " + month;
            break;
        case "Apr":
            return monthsU[3] + " " + monthsL[3] + " " + month;
            break;
        case "May":
            return monthsU[4] + " " + monthsL[4] + " " + month;
            break;
        case "Jun":
            return monthsU[5] + " " + monthsL[5] + " " + month;
            break;
        case "Jul":
            return monthsU[6] + " " + monthsL[6] + " " + month;
            break;
        case "Aug":
            return monthsU[7] + " " + monthsL[7] + " " + month;
            break;
        case "Sept":
            return monthsU[8] + " " + monthsL[8] + " " + month;
            break;
        case "Oct":
            return monthsU[9] + " " + monthsL[9] + " " + month;
            break;
        case "Nov":
            return monthsU[10] + " " + monthsL[10] + " " + month;
            break;
        case "Dec":
            return monthsU[11] + " " + monthsL[11] + " " + month;
            break;
        default:
            alert("no matching case");
    }
}
const updateTasks = async(keys) =>{
    try{
        const data = await AsyncStorage.multiGet(keys);

            let decoded = [];
            let blank = {id: "000", task: "EXAMPLE TASK", date: "", color: "", visable: false};

            console.log("Data object length: ", data.length);

            for(let i = 0; i < data.length; i++){
                decoded.push(JSON.parse(data[i][1]));
            }

            console.log("Matching items found: ", decoded);
            
            await setTaskArray(decoded);
        
    }
    catch(error){
        alert("error with updating search screen");
    }
}
const clearBtn = async(text) =>{
    await setDisplay("flex");
    await setInput(text);
}
const clearInput = async() =>{
    await setInput("");
    await setSearch("");
}
  return(
    <SafeAreaView style = {style.container}>
        <View style = {style.extraHeight}>
        </View>
        <ScrollView>
            <View style = {style.searchArea}>
                <TextInput style = {style.searchBar} 
                    placeholder = "Search by exact task, month or date"
                    onChangeText = {async(text) => {await setSearch(text); await clearBtn(text)}}
                    autoCorrect = {true}
                    value = {inputValue}
                />
                {/* <TouchableOpacity style = {style.closeBtn} onPress = {() => clearInput()}>
                    <Icon style = {{display: btnDisplay}} name = "close" size = {30}/>
                </TouchableOpacity> */}
                <TouchableOpacity style = {style.searchButton} onPress = {() => searchData()}>
                    <Icon name = "search1" size = {30} />
                </TouchableOpacity>
            </View>
            <View style = {style.inputArea}>
                <Text style = {style.title}>{search}</Text>
            </View>
            {/* searchData() */}
            <View>
                {taskArray.map(newEle => {
                return(
                    <Tab key={newEle.id} task={newEle.task} date={newEle.date} color={newEle.color} visable={newEle.visable} remove={removeTask}/>
                )
                })}
            </View>
            <View style = {style.buttonArea}>
                <TouchableOpacity style = {style.decButtons} onPress = {() => {navigation.navigate("Home");}}>
                    <Text style = {style.buttonDes}>Return to Home Page</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    );  
}

//borderWidth: 1
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        height: "100%"
    },
    scrollframe:{
    },
    extraHeight: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0,
        backgroundColor: "white",
        borderBottomWidth: 1
    },
    title: {
        fontSize: 30,
        paddingTop: "5%",
        alignSelf: "center",
        color: "#ababab"
    },
    inputArea: {
        marginLeft: "5%",
        marginRight: "5%"
    },
    decButtons: {
        backgroundColor: "black",
        paddingTop: 10,
        paddingBottom: 10,
        width: "45%",
        borderRadius: 18
    },
    buttonDes: {
        color: "#fff",
        alignSelf: "center"
    },
    buttonArea: {
        width: "100%",
        marginTop: "5%",
        alignItems: "center",
        // borderWidth: 1,
    },
    searchBar: {
        borderBottomWidth: 3,
        width: "80%",
        height: 40,
        paddingLeft: 5,
        paddingTop: 1,
        paddingBottom: 1,
        marginTop: 0,
        margin: "2%",
        marginLeft: "5%",
        marginRight: 0,
        backgroundColor: "#fff",
        // borderWidth: 1        
    },
    searchButton: {
        margin: "2%",
        marginRight: "1%",
        marginLeft: "3%",
        // borderWidth: 1
    },
    closeBtn: {
        borderBottomWidth: 3,
        height: 40,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 5,
        width: "8%",
        // borderWidth: 1,
    },
    searchArea: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "5%",
        //borderWidth: 1
    },
});