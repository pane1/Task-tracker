import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Tab from "./Tab";

export default function Folder ({task, date, color, visable, remove}){  
  //red, orange, yellow, green, cyan, light blue, dark blue, purple, pink
  const taskColor = ["#fff","#eb4034", "#f58d38", "#f5df38", "#a0f538", "#38f5a6", "#38e8f5", "#3890f5", "#b638f5", "#f538b9"];

  const folderTitleColor = [];
  const folderColor = [];

  var tabColor = color;
  var taskAssigned; 
  var dateAssigned;
  var displayFlag = "none";

  const [displayDele, setDisDele] = useState("none");
  const [opac, setOpac] = useState(1);
  const [border, setBorder] = useState(0);

  const id = "ID_"+task+"_"+date;

  
  return(
    <View style = {[style.container,{alignItems: "center"}]}>
        <View style = {style.folderTitle}>
            <Text style = {style.title}>Test folder</Text>
            <TouchableOpacity style = {style.addBtn}>
                <Icon name="plus" size={30}/>
            </TouchableOpacity>
        </View>
        <View style = {style.folderArea}>
            <Tab key={"001"} task={"test1"} date={"Jun/22"} color={taskColor[1]} visable={true}/>
            <Tab key={"002"} task={"test2"} date={"Jun/23"} color={taskColor[2]} visable={true}/>
            <Tab key={"003"} task={"test3"} date={"Jun/24"} color={taskColor[3]} visable={true}/>
            <Tab key={"004"} task={"test4"} date={"Jun/25"} color={taskColor[4]} visable={true}/>
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
    // borderWidth: 1
  },

  title: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 5
  },
  folderArea: {
    backgroundColor: "#b5b3b3",
    width: "95%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  folderTitle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#6e6e6e",
    height: 50,
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between'
  },
  addBtn: {
    paddingTop: 10,
    paddingRight: 10
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