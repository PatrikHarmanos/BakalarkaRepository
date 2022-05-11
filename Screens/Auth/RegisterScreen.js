import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { HelperText } from 'react-native-paper';
import { FETCH } from '../../Helpers/FetchHelper'
import {BASE_URL} from '../../cofig'

const RegisterScreen = ({navigation}) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userNumber, setUserNumber] = useState('');

  const hasErrors = () => {
    var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (userEmail !== '' && !userEmail.match(validRegex))
      return true
    return false
  };

  const badPhoneNumber = () => {
    var validRegex = /^(0[0-9]*)$/;
    if (userNumber !== '' && !userNumber.match(validRegex))
      return true
    return false
  }

  const handleRegisterButton = () => {
    if (!userFirstName) {
      alert('Please fill First Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!userNumber) {
      alert('Please fill Number');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }

    const dataToSend = {
      email: userEmail,
      password: userPassword,
      first_name: userFirstName,
      last_name: userLastName,
      phone_number: userNumber,
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    }

    FETCH(`${BASE_URL}/accounts/`, options).then((data) => {
      if (data.email && data.email[0] === 'account with this email already exists.') {
        alert("E-mailová adresa je obsadená.")
        return
      } else if (data.password && data.password[0] === 'This password is too short. It must contain at least 8 characters.') {
        alert("Príliš slabé heslo.")
        return
      } else {
        alert("Registrácia bola úspešná. Prosím potvrďte vašu e-mailovú adresu.")
        navigation.navigate("LoginScreen");
      }
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Registrácia</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView>
          <Text style={[styles.text_footer, {marginTop: 5}]}>Meno</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(FirstName) => setUserFirstName(FirstName)}
                placeholder="Zadajte meno"
            /> 
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Priezvisko</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(LastName) => setUserLastName(LastName)}
                placeholder="Zadajte priezvisko"
            />
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(Email) => setUserEmail(Email)}
                placeholder="Zadajte email"
            /> 
            <HelperText type="error" visible={hasErrors()}>
              Zlý formát e-mailu!
            </HelperText>
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Telefónne číslo</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(number) => setUserNumber(number)}
                placeholder="Zadajte telefónne číslo"
            /> 
            <HelperText type="error" visible={badPhoneNumber()}>
              Zlý formát! (iba číslice)
            </HelperText>
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Heslo</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(password) => setUserPassword(password)}
                placeholder="Zadajte heslo"
                secureTextEntry={true}
            /> 
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={handleRegisterButton} style={styles.signIn}>
                <Text style={styles.textSign}>Vytvoriť účet</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      
    </View>
  );
};
export default RegisterScreen;

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