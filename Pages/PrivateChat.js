import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar"
import socketIOClient from "socket.io-client"
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity , KeyboardAvoidingView , ScrollView} from "react-native";
import * as eva from "@eva-design/eva";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { NativeRouter, Route, Link, useParams } from "react-router-native";
import { Input, ApplicationProvider, Button } from "@ui-kitten/components";
import * as DocumentPicker from 'react-native-document-picker'
import { requestHundler } from '../requestHundler/requestHundler'
const RNFS = require('react-native-fs')
const ENDPOINT = "http://10.0.2.2:3000"
const socket = socketIOClient(ENDPOINT)

export default function PrivateChat({ user , flag , setFlag }) {
  let { id } = useParams("id");
  let { name } = useParams("name");
  const [room, setRoom] = useState({ message: [] })
  const [file, setFile] = useState()
  const [result, setResult] = useState()
  const [fileName, setFileName] = useState("")
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setFlag(false)
    socket.emit('joinRoom', id)
    socket.on('joinRoom', data => {
      setRoom(data)
      setMessages(data.message)
    })
  }, [])


  const getMessages = () => {
    socket.on('private message', data => {
      setMessages(data)
    })
  }

 

  useEffect(() => {
    if (result) {
      const body = new FormData()
      body.append('file', result[0])
      fetch(ENDPOINT + '/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
        body: body
      }).then(response => { response.json() })
        .then(data => {
          socket.emit('private message', { text: 0, user_id: 0, date: new Date(), room_id: id })
          getMessages()
        })
    }
  }, [result])



  const sendMessage = (e) => {
    e.preventDefault()
    setFlag(false)
    socket.emit('private message', { text: msg, user_id: user.id, date: new Date(), room_id: id })
    getMessages()
    setMsg('')
  }


  const selectFile = () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    }).then((res) => {
      setResult(res)
    });
  };

  const onDownloadImagePress = (url) => {
    let fileName = url.split('/')
    fileName = fileName[fileName.length - 1]
    const u = ENDPOINT + '/' + fileName + '/' + 'download'
    RNFS.downloadFile({
      fromUrl: u,
      toFile: `${RNFS.DownloadDirectoryPath}/1${fileName}`,
    }).promise.then((r) => {
    });
  }




  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <Text style={{ textAlign: "center" }}>{name}</Text>
      </View>
      <View style={{...styles.messages , marginBottom: flag ? 75 : 0}}>
        <ScrollView style={styles.messagesBox}>
          {messages.map((item, id) => (
            <View key={id} style={item.user_id === user.id ? styles.messageRight : styles.messageLeft}>
              <View style={styles.messageHead}>
                <Image
                  source={
                    item.user_type === 0
                      ? require("../img/teacher.png")
                      : require("../img/student.png")
                  }
                  style={styles.img}
                />
                <Text>{item.name}</Text>
              </View>
              {item.file === 'null' || item.file === null ? <Text>{item.text}</Text> : <Text style={{color:'blue'}} onPress={e => onDownloadImagePress(ENDPOINT + item.file)}>{item.file.split('/')[2]}</Text>}
              <Text style={styles.date}>{(item.date.split('T')[1].split(':')[0]) + ":" + (item.date.split('T')[1].split(':')[1])}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.form}>
          <TouchableOpacity style={styles.uploadFile} onPress={selectFile}>
            <Image source={require("../img/file.png")} style={styles.img} />
          </TouchableOpacity>
          <Input value={msg} onChangeText={e => setMsg(e)} onBlur={sendMessage} style={{width: "100%"}}  onFocus={e => setFlag(true)}/>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  messagesBox: {
    backgroundColor: "rgb(215 ,200 ,247)",
    height: "83%",
    padding: 10,
  },
  messageLeft: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 7,
    // width: "fit-content",
    textAlign: 'right',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  messageRight: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 7,
    // width: "fit-content",
    textAlign: 'right',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  messageHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 30, 
    height: 30, 
    borderRadius: 10
  },
  date: {
    textAlign:'right', 
    fontSize:10
  }
});
