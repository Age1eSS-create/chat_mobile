
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isInProgress,
    types,
  } from 'react-native-document-picker'
import { Input , ApplicationProvider , Button  } from "@ui-kitten/components";
// import * as eva from "@eva-design/eva";
// import { BottomNavigation , BottomNavigationTab  } from "@ui-kitten/components";
import { NativeRouter, Route, Link , Routes } from "react-router-native";
import Friends from "./Friends"
import PublicChat from "./PublicChat"
import PrivateChat from "./PrivateChat";
import AddFriend from "./AddFriend";

export default function Main({ user , setUser }) {
  const [flag , setFlag] = useState(false)
  return (
    <NativeRouter >
      <View style={styles.container}>
        <Routes>
            <Route exact path="/" element={<Friends setUser={setUser} user={user}/>} />
            <Route exact path="/addFriend" element={<AddFriend user={user}/>} />
            <Route exact path="/chat" element={<PublicChat user={user} flag={flag} setFlag={setFlag}/>} />
            <Route exact path="/:id/:name/PrivateChat" element={<PrivateChat user={user} flag={flag} setFlag={setFlag}/>} />
        </Routes>
        <View style={{...styles.menu , paddingTop: flag?18:0}}>
            <Link to='/'><Text style={styles.menuText}>Консультации</Text></Link>
            <Link to='/chat'><Text style={styles.menuText}>Общий чат</Text></Link>
            {/* <Link to='/chat'><Text style={styles.menuText}>Общий чат</Text></Link> */}
          {/* <BottomNavigationTab title="Студенты" ><Link to='/'/></BottomNavigationTab>
          <BottomNavigationTab title="Общий чат" ><Link to='/chat'/> </BottomNavigationTab> */}
        </View>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu : {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    height:'6%',
    // backgroundColor:'#62b3ff',
    color:'#8962ff',
    alignItems:'center',
    position:'absolute',
    zIndex:3,
    bottom:0,
    width:'100%'
  },
  menuText : {
      color:'#8962ff',
      fontWeight:'700',
  }
  
});
