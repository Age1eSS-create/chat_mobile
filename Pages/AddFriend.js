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
import { requestGet , requestHundler } from '../requestHundler/requestHundler'
import { Input , ApplicationProvider , Button  } from "@ui-kitten/components";
const ENDPOINT = "http://10.0.2.2:3000"

export default function AddFriend({ user , setUser }) {
    const [users, setUsers] = useState([])


    const callbackAdd = (data) => {
        let tmpUsers = []
        for (let i = 0 ; i < data.length ; i++ ) {
            let flag = true
            for (let j = 0 ; j < user.friends.length ; j++) {
                console.log(data[i].id ,user.friends[j].id )
                if (data[i].id === user.friends[j].id) flag = false
            }
            if (flag) tmpUsers.push(data[i])
        }
        setUsers(tmpUsers)
    }

    useEffect(() => {
        requestGet(ENDPOINT + '/users', null, callbackAdd)
    }, [])

    const callback = (e) => {

    }
    const addUser = (userId ) => {
        requestHundler(JSON.stringify({id:userId}) ,ENDPOINT+'/friend' , callback )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Пользователи</Text>
            </View>
            <View style={styles.friends}>
                {users.map((item, id) => (
                    <View style={styles.friend}>
                        <Image
                                source={item.type === 0 ? (item.gender == "male" ? require("../img/teacher.png") : require("../img/teacherW.png") ) :(item.gender=='male' ? require("../img/student.png") : require("../img/studentW.png") )}
                                style={styles.img}
                                size="giant"
                            />
                            <Text>{item.name}</Text>
                            <Button size='small' appearance='outline' onPress={e =>addUser(item.id)}>Добавить</Button>

                    </View>
                ))}
            </View>
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
        padding: 9,
        justifyContent:'space-around',
    },
    addContainer: {
        position: "absolute",
        top: "93%",
        left: "86%",
    },
    linkContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    img : {
        width: 50, 
        height: 50, 
        borderRadius: 50
    }
});
