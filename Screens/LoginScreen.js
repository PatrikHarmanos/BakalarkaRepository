import React, {useState} from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
  Platform
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const storeToAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch(error) {
      console.log(error);
    }
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }

  const handleSubmitButton = async () => {

    if (!userEmail) {
      alert('Prosím zadajte email');
      return;
    }

    if (!userPassword) {
      alert('Prosím zadajte heslo');
      return;
    }

    var dataToSend = {
      email: userEmail,
      password: userPassword,
    }

    await fetch('http://147.175.150.96/api/account/token/', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // if login was successfull, go to HomeScreen and save access token
        if (responseJson.detail != "No active account found with the given credentials") {
          // save access and refresh token to secure storage
          save('access' , responseJson.access);
          save('refresh', responseJson.refresh);

          // get user info from server
          fetch('http://147.175.150.96/api/account/my_account/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + responseJson.access,
            }
          })
            .then((r) => r.json())
            .then ((rJson) => {
                // store user info to async storage
                storeToAsyncStorage('@email', rJson.email);
                storeToAsyncStorage('@first_name', rJson.person.first_name);
                storeToAsyncStorage('@last_name', rJson.person.last_name);
                storeToAsyncStorage('@phone_number', rJson.person.phone_number);
            })
            .catch((error) => {
                console.log(error);
            });

          // navigate to the app
          navigation.navigate("DrawerNavigation");
        } else {
          // else show an error
          alert('Nesprávny email alebo heslo. Skúste znovu.');
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Prihlásenie</Text>
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView>
          <Text style={[styles.text_footer, {marginTop: 5}]}>Email</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(Email) => setUserEmail(Email)}
                placeholder="Zadajte Email"
            /> 
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Heslo</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(password) => setUserPassword(password)}
                placeholder="Zadajte Heslo"
                secureTextEntry={true}
            /> 
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={handleSubmitButton} style={styles.signIn}>
                <Text style={styles.textSign}>Prihlásiť sa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} style={styles.signIn}>
                <Text style={styles.textSign}>Vytvoriť ucet</Text>
            </TouchableOpacity>
          </View>
        
        </KeyboardAvoidingView>
             
      </View>
      
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393485'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#393485'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});