import React, { useState , useEffect} from "react";
import socketIOClient from "socket.io-client"
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image, KeyboardAvoidingView  , ScrollView  } from "react-native";
import * as eva from "@eva-design/eva";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { NativeRouter, Route, Link } from "react-router-native";

import { Input, ApplicationProvider, Button } from "@ui-kitten/components";



const ENDPOINT = "http://10.0.2.2:3000"
const socket = socketIOClient(ENDPOINT);


export default function PublicChat({ user , flag , setFlag}) {
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState([])
  useEffect(() => {
    setFlag(false)
      socket.on('chat message', data => {
        setMessages(data)
      })
      socket.on('get messages', data => {
        setMessages(data)
      })
      socket.emit('get messages', {})
  }, [])

  const sendMessage = (e) => {
    setFlag(false)
    socket.emit('chat message', { user_id: user.id, text: msg, date:new Date() , room_id:0 , type:user.type })
    setMsg('')
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={{ textAlign: "center" }}>Общий чат</Text>
      </View>
      <View style={{...styles.messages , marginBottom: flag ? 56 : 0}}>
        <ScrollView style={styles.messagesBox}>
          {messages.map((item,id) => (
            <View key={id} style={item.user_id === user.id ? styles.messageRight : styles.messageLeft}>
              <View style={styles.messageHead}>
                <Image
                  source={
                    item.user_type == 0
                      ? (item.gender == "male" ? require("../img/teacher.png") : require("../img/teacherW.png") )
                      : (item.gender=='male' ? require("../img/student.png") : require("../img/studentW.png") )
                  }
                  style={styles.img}
                />
                <Text>{item.name}</Text>
              </View>
              <Text>{item.text}</Text>
              <Text style={styles.date}>{(item.date.split('T')[1].split(':')[0]) + ":" + (item.date.split('T')[1].split(':')[1])}</Text>
            </View>
          ))}
        </ScrollView>
        <Input value={msg} onChangeText={e => setMsg(e)} onBlur={sendMessage} onFocus={e => setFlag(true)}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%'
  },
  header: {
    textAlign: "center",
    backgroundColor: "#8962ff",
    padding: 10,
    color: "white",
    fontWeight: "500",
  },
  messages: {
    display: "flex",
    
    
    // gridTemplateRows: '6fr 1fr',
    // grid-template-rows: 6fr 1fr;
  },
  messagesBox: {
    backgroundColor: "rgb(215 ,200 ,247)",
    height:'83%',
    padding:10,
  },
  messageLeft: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 7,
    // width: "fit-content",
    textAlign: 'right',
    marginBottom:10,
    alignSelf:'flex-start',
  },
  messageRight : {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 7,
    // width: "fit-content",
    textAlign: 'right',
    marginBottom:10,
    alignSelf: 'flex-end',
  },
  messageHead : {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 30, 
    height: 30, 
    borderRadius: 10,
  },
  date: {
    textAlign:'right', 
    fontSize:10,
  }
});
