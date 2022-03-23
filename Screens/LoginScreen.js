import React, {useState, useContext} from "react";
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

import Context from "../store/context";

const LoginScreen = ({ navigation }) => {

  const {state, actions} = useContext(Context);

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

    await fetch('http://147.175.150.96/api/accounts/token/', {
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
          fetch('http://147.175.150.96/api/accounts/me', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + responseJson.access + 'sss',
            }
          })
            .then((r) => r.json())
            .then ((rJson) => {
              // ak je platny
              if (rJson.code !== "token_not_valid") {
                actions({type: 'setState', payload: {...state, 
                  first_name: rJson.first_name,
                  last_name: rJson.last_name,
                  email: rJson.email,
                  phone_number: rJson.phone_number,
                  is_courier: rJson.courier !== null ? true : false,
                  courier_mode_on: false
                }});
                // navigate to the app
                navigation.navigate("DrawerNavigation");
              } else {
                // ak je neplatny access token
                // call refresh
                fetch('http://147.175.150.96/api/accounts/token/refresh/', {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({"refresh": responseJson.refresh})
                })
                  .then((res) => res.json())
                  .then ((responseJsonSecond) => {
                    console.log(responseJsonSecond)
                    // save new access and refresh token
                    save('access' , responseJsonSecond.access);
                    save('refresh', responseJsonSecond.refresh);

                    // get user info from server with new access token
                    fetch('http://147.175.150.96/api/accounts/me', {
                      method: "GET",
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + responseJsonSecond.access,
                      }
                    })
                      .then((res) => res.json())
                      .then ((responseJson) => {
                        console.log(responseJson)
                        actions({type: 'setState', payload: {...state, 
                          first_name: responseJson.first_name,
                          last_name: responseJson.last_name,
                          email: responseJson.email,
                          phone_number: responseJson.phone_number,
                          is_courier: responseJson.courier !== null ? true : false,
                          courier_mode_on: false
                        }});
                        // navigate to the app
                        navigation.navigate("DrawerNavigation");
                      })
                  })
              }
              
            })
            .catch((error) => {
                console.log(error);
            });
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