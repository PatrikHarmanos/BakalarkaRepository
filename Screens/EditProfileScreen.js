import React, {useState, useEffect} from "react";
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

const EditProfileScreen = () =>{

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    try {
      SecureStore.getItemAsync('access').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/account/my_account/', {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              })
              .then((response) => response.json())
              .then ((responseJson) => {
                  console.log(responseJson);
                  setEmail(responseJson.email);
                  setFirstName(responseJson.person.first_name);
                  setLastName(responseJson.person.last_name);
                  setPhoneNumber(responseJson.person.phone_number);
              })
              .catch((error) => {
                  console.log(error);
              });
          } else {
              // call refresh token
              return;
          }
      })
    } catch(error) {
        console.log(error);
    }
  }, [])
  
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

    var dataToSend = {
      email: email,
      person: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      }
    }
    
    try {
      await AsyncStorage.getItem('@access_token').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/account/my_account/', {
                  method: "PATCH",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
                  body: dataToSend
              })
              .then((response) => response.json())
              .then ((responseJson) => {
                  console.log(responseJson);
              })
              .catch((error) => {
                  console.log(error);
              });
          } else {
              
          }
      })
    } catch(error) {
        console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={[styles.text_footer, {marginTop: 5}]}>Meno</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(FirstName) => setFirstName(FirstName)}
              placeholder="Zadajte meno"
              defaultValue={firstName}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Priezvisko</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(LastName) => setLastName(LastName)}
              placeholder="Zadajte priezvisko"
              defaultValue={lastName}
          />
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(Email) => setEmail(Email)}
              placeholder="Zadajte Email"
              defaultValue={email}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Telefónne číslo</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(Number) => setPhoneNumber(Number)}
              placeholder="Zadajte telefónne číslo"
              defaultValue={phoneNumber}
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Heslo</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(password) => setUserPassword(password)}
              placeholder="Zadajte heslo"
              editable={false}
          /> 
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
              <Text style={styles.textSign}>Zmeniť údaje</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>      
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