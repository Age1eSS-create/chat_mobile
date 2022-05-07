import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import * as eva from "@eva-design/eva";
import {
  BottomNavigation,
  BottomNavigationTab,
  Avatar,
} from "@ui-kitten/components";
import { NativeRouter, Route, Link } from "react-router-native";
import { requestGet } from '../requestHundler/requestHundler'
const ENDPOINT = "http://10.0.2.2:3000"

export default function Friends({user , setUser  }) {
  const [friends, setFriend] = useState([])
  const infoUser = (data) => {
    setUser(data)
    setFriend(data.friends)
  }

  useEffect(() => {
    requestGet(ENDPOINT + '/user', null, infoUser)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Консультации</Text>
      </View>
      <View style={styles.friends}>
        {friends.map((item, id) => (
          <View style={styles.friend}>
            <Link to={"/" + (user.id > item.id ? String(item.id) + String(user.id) : String(user.id) + String(item.id)) + '/'+ item.name + "/PrivateChat"}>
              <View style={styles.linkContent}>
                <Image
                  source={item.type === 0 ? (item.gender == "male" ? require("../img/teacher.png") : require("../img/teacherW.png") ) :(item.gender=='male' ? require("../img/student.png") : require("../img/studentW.png") )}
                  style={styles.img}
                  size="giant"
                />
                <Text>{item.name}</Text>
              </View>
            </Link>
          </View>
        ))}
      </View>
      {user.type == 0 ?
        <View style={styles.addContainer}>
          <Link to={'/addFriend'}>
            <Image
              source={require("../img/add.png")}
              style={{ width: 35, height: 35 }}
            />
          </Link>
        </View>
        :
        <></>  
      }
    </View>
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
  friends: {
    padding: 15,
  },
  friend: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "#62b3ff",
    borderBottomWidth: 1,
    padding: 2,
  },
  addContainer: {
    position: "absolute",
    top: "85%",
    left: "86%",
  },
  linkContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 50, 
    height: 50, 
    borderRadius: 50
  }
});
