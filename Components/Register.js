import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView,
    Button, 
    TextInput, 
    TouchableOpacity, 
    StatusBar, 
    AsyncStorage,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

import { Calendar, CalendarList } from 'react-native-calendars';
import { Icon } from 'react-native-elements'
import moment from "moment";
import { NavigationHelpersContext } from '@react-navigation/native';
import { Assets } from '@react-navigation/stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

const dateFormat = "YYYY-MM-DD";
const todayDate = moment().format(dateFormat);

export default function Register ({navigation, route, visable,screenChange,addFunction}){
    //red, orange, yellow, green, cyan, light blue, dark blue, purple, pink
    const taskColor = ["#eb4034", "#f58d38", "#f5df38", "#a0f538", "#38f5a6", "#38e8f5", "#3890f5", "#b638f5", "#f538b9"];
    const [task,setTask] = useState("");
    const [date,setDate] = useState("");
    const [color,setColor] = useState("");
    const [selectedDate, setSelectedDate] = useState({[todayDate]: {selected:true}});
    
    useEffect(() => {
        if(date == ""){
            dateSetter(todayDate);
        }
    });
    
    const dateSetter = (day) => {
        const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const newDate = Months[parseInt(day.substring(5,7)) - 1] + "/" +day.substring(8,10);
        // console.log(newDate);
        // console.log();
        // console.log(day);
        setDate(newDate);
    }
    const onDaySelect = (day) => {
        let selected = true;

        if (selectedDate[day]) {
          // Already in marked dates, so reverse current marked state
          selected = !selectedDate[day].selected;
        }
        
        var updatedMarkedDates = { [day]: {selected} }
        
        // Triggers component to render again, picking up the new state
        setSelectedDate(updatedMarkedDates);
    }
    
    const storeData = async() => {
        try{
            var data = {task: task, date: date, color: color, visable: true};
            console.log("Stored data (Reg): " + data);
            await AsyncStorage.setItem("newTask", JSON.stringify(data));

        }
        catch(error){
            console.log("error with setting task");
        }
    };

    const retrieveData = async() =>{
        try{
            // var id = "id_"+key;
            const data = JSON.parse(await AsyncStorage.getItem("newTask"));
            if(data !== null){
                console.log("Data retrieved (Reg): "+ data.task);
            }
        }
        catch(error){
            console.log("error with getting task");
        }
    }

    const clearData = async() =>{
        AsyncStorage.clear();
    }

    return(
        <SafeAreaView style = {style.container}>
            <View style = {style.extraHeight}>
            </View>
            <ScrollView style = {style.scrollFrame}>
                
                <Text style={style.title}>Register your Task</Text>
                <View style={style.taskInputArea}>
                    <TextInput 
                        placeholder = "Tasks (E.g Drink water)" 
                        style = {style.inputArea}
                        onChangeText = {(text) => setTask(text)}

                        autoCapitalize="characters"
                    />
                    {/* <TouchableOpacity style = {style.closeBtn}>
                        <Icon name = "close" size = {30}/>
                    </TouchableOpacity> */}
                </View>
                <Text style = {style.title}>Date of last completion:</Text>
                <View style = {style.calendarArea}>
                    <CalendarList style={style.calendarDesign}
                        theme={{
                            textMonthFontSize: 25,
                            calendarBackground: "#f7f7f7",
                            textDayHeaderFontSize: 16,
                            dayTextColor: "black"
                        }}
                        
                        // Enable horizontal scrolling, default = false
                        horizontal={true}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={true}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {
                            console.log('selected day', day),
                            dateSetter(day.dateString);
                            onDaySelect(day.dateString);
    
                        }}
                        // Set custom calendarHeight.
                        calendarHeight={330}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={Date()}
                        markedDates={selectedDate}
                        selected={Date()}
                    />
                </View>
                <View style={style.colorTitle}>
                    <Text style = {style.title}>Pick your task color:</Text>
                    <View style={[style.currentColor,{backgroundColor: color}]}></View>
                </View>
                <View style={style.colorArea}>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[0]}]} onPress={() =>{
                        setColor(taskColor[0]);  
                    }}>
                        <Text></Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[1]}]} onPress={() =>{
                        setColor(taskColor[1]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[2]}]} onPress={() =>{
                        setColor(taskColor[2]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[3]}]} onPress={() =>{
                        setColor(taskColor[3]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[4]}]} onPress={() =>{
                        setColor(taskColor[4]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[5]}]} onPress={() =>{
                        setColor(taskColor[5]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[6]}]} onPress={() =>{
                        setColor(taskColor[6]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[style.colorIcon,{backgroundColor: taskColor[7]}]} onPress={() =>{
                        setColor(taskColor[7]);  
                    }}>
                        <Text></Text>
                    </TouchableOpacity>
     
                </View>
                <View style = {style.buttonArea}>
                    <TouchableOpacity 
                        style = {style.decButtons} 
                        onPress = {() => {             
                            
                            if(task != "" && color != ""){
                            
                                //storeData();
                                // retrieveData();
                                // console.log(task + " " + date + " " + color);
                                // addTask();
                                // screenChange();

                                navigation.navigate("Home", {newTask: task.toUpperCase(), newDate: date, selectedColor: color, visable: true});
                                console.log("******************************************************************************************************************************");
                            }
                            else{
                                alert("Missing information, please fill all fields first.");
                            }
                            
                        }}
                    >
                        <Text style = {style.buttonDes}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {style.decButtons} 
                        onPress = {() => {
                            navigation.navigate("Home");
                        }}
                    >
                        <Text style = {style.buttonDes}>Cancel</Text>
                    </TouchableOpacity>
                </View> 
                <View style={style.bottomArea}>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
    
}

//   const [task, setTask] = useState('');
//   const [counter, setCounter] = useState('');

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        width: "100%"
    },
    extraHeight: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0,
        backgroundColor: "white",
        borderBottomWidth: 1
    },
    title: {
        fontSize: 25,
        margin: "2%",
        marginBottom: "3%",
        marginTop: "3%",

    },
    inputArea: {
        borderBottomWidth: 3,
        width: "90%",
        height: 50,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        margin: "5%",
        marginRight: 0,
        marginTop: 0,
        backgroundColor: "#fff",
        fontSize: 20,
        // borderWidth: 1
    },
    taskInputArea: {
        flexDirection: "row",
        flexWrap: "wrap",
        // borderWidth: 1
    },
    closeBtn: {
        borderBottomWidth: 3,
        height: 50,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 10,
        // borderWidth: 1
    },
    buttonArea: {
        flexDirection: "row",
        width: "100%",
        marginTop: "2%",
        justifyContent: "flex-end"
    },
    buttonDes: {
        textAlign: "center",
        color: "#fff"
    },
    decButtons: {
        backgroundColor: "black",
        paddingTop: 10,
        paddingBottom: 10,
        width: "25%",
        marginRight: "5%",
        borderRadius: 18
    },
    calendarArea: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginBottom: "5%"
    },
    scrollFrame: {
        height: "50%",
    },
    colorArea: {
        width: "75%",
        height: "17%",
        marginRight: "12.5%",
        marginLeft: "12.5%",
        marginBottom: "5%",
        borderRadius: 22,
        borderStyle: 'dashed',
        borderColor: "grey",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        borderWidth: 1
    },
    colorIcon: {
        borderRadius: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height/16,
        width: Dimensions.get('window').width/8,
        marginTop: "5%",
        marginLeft: "2.5%",
        marginRight: "2.5%"
    },
    colorTitle: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: "2%"
    },
    currentColor: {
        height: 44,
        width: 44,
        margin: "2%",

        alignSelf: "flex-start",
    },
    bottomArea: {
        marginBottom: "5%",
        marginTop: "5%"
    },
    
});
