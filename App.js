/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import * as eva from '@eva-design/eva';

import { Input , ApplicationProvider , Button  } from "@ui-kitten/components";
import Main from "./Pages/Main";
import {requestHundler} from './requestHundler/requestHundler'
const ENDPOINT = "http://10.0.2.2:3000"
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [login , setLogin] = useState('')
  const [password , setPassword] = useState('')
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const [user , setUser] = useState(0)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const callbackAuth = (data) => {
    setUser(data)
  }

  const auth = () => {
    //setUser(1)
    requestHundler(JSON.stringify({login:login , password:password}),ENDPOINT+'/auth' ,callbackAuth )
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light} style={styles.container}>
      {user ? <Main user={user}  setUser={setUser}/>
      :
      <ImageBackground source={require("./img/bg.jpg")} style={styles.image}>
        <View style={styles.auth}>
          <Input
            style={styles.input}
            placeholder="Place your login"
            value={login}
            onChangeText={(nextValue) => setLogin(nextValue)}
          />
          <Input
            style={styles.input}
            placeholder="Place your password"
            value={password}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
          <Button size='small' appearance='outline' onPress={auth}>Войти</Button>
        </View>
      </ImageBackground>
      }
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  auth: {
    width: '70%',
    margin: 'auto',
    padding: 15,
    backgroundColor: 'cornsilk',
    borderRadius: 10,
  },
  input : {
    marginBottom: 10,
  }
});


export default App;
