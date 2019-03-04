import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  PushNotificationIOS,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var PushNotification = require('react-native-push-notification');

export default class App extends Component {
  componentDidMount() {
  //  this.getToken();
  this.initNotification()
  }

  initNotification = async () => {
    await this.setPermission();
    const fcmToken = await firebase.messaging().getToken();
    console.log('fcmToken', fcmToken);
    alert(fcmToken);
    const response =  axios.post('http://203.113.11.188/api/saveuser/update_token',{
        save_phone : '0957564377' ,
        token:fcmToken,
        device_type:'android'
        // device_type:
      })

    
  }

  setPermission = async () => {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (!enabled) {
        await firebase.messaging().requestPermission();
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});