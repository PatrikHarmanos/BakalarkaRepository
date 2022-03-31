import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import Context from "../../store/context";
import { callAPI } from '../../Helpers/FetchHelper'

const EditProfileScreen = ({navigation}) => {

  const {state, actions} = useContext(Context);

  const [email, setEmail] = useState(state.email);
  const [firstName, setFirstName] = useState(state.first_name);
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [lastName, setLastName] = useState(state.last_name);
  const [phoneNumber, setPhoneNumber] = useState(state.phone_number);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
  }
  
  const handleRegisterButton = async () => {
    if (!firstName) {
      alert('Please fill First Name');
      return;
    }
    if (!lastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!phoneNumber) {
      alert('Please fill Number');
      return;
    }
    if (!email) {
      alert('Please fill Email');
      return;
    }

    let start = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    }

    if (password) {
      if (!repeatPassword) {
        alert('Please fill password again');
        return;
      }
      if (password != repeatPassword) {
        alert('Hesla sa nezhoduju');
        return;
      }
      let end = {
        password: password
      }
    }

    const dataToSend = Object.assign(start, end)
    
    try {
      await SecureStore.getItemAsync('access').then((token) => {
          if (token != null) {
            callAPI(
              'http://147.175.150.96/api/accounts/me',
              'PATCH',
              {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              },
              JSON.stringify(dataToSend)
            ).then ((data) => {
              if (data.code !== 'token_not_valid') {
                actions({type: 'setState', payload: {...state, 
                  first_name: data.first_name,
                  last_name: data.last_name,
                  email: data.email,
                  phone_number: data.phone_number
                }});
                navigation.navigate("Profile")
              } else {
                SecureStore.getItemAsync('refresh').then((refreshToken) => {
                  // if access token is invalid => call refresh token
                  callRefreshToken(refreshToken).then((data) => {
                    // save new access and refresh token
                    save('access', data.access)
                    save('refresh', data.refresh)
  
                    callAPI(
                      'http://147.175.150.96/api/accounts/me',
                      'PATCH',
                      {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + data.access,
                      },
                      JSON.stringify(dataToSend)
                    ).then((data) => {
                      actions({type: 'setState', payload: {...state, 
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        phone_number: data.phone_number
                      }});
                      navigation.navigate("Profile")
                    })
                  })
                })
              }
            })
          } else {
            navigation.navigate("Auth");
          }
      })
    } catch(error) {
        console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.text_footer, {marginTop: 5}]}>Meno</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(FirstName) => setFirstName(FirstName)}
              placeholder="Zadajte meno"
              defaultValue={state.first_name}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Priezvisko</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(LastName) => setLastName(LastName)}
              placeholder="Zadajte priezvisko"
              defaultValue={state.last_name}
          />
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(Email) => setEmail(Email)}
              placeholder="Zadajte Email"
              defaultValue={state.email}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Telefónne číslo</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(Number) => setPhoneNumber(Number)}
              placeholder="Zadajte telefónne číslo"
              defaultValue={state.phone_number}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Heslo</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(password) => setPassword(password)}
              placeholder="Zadajte heslo"
              secureTextEntry={true}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Potvrdiť heslo</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(password) => setRepeatPassword(password)}
              placeholder="Zadajte heslo"
              secureTextEntry={true}
          /> 
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
              <Text style={styles.textSign}>Zmeniť údaje</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>      
    </View>
      
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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