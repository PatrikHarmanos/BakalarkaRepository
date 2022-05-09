import React, { useState, useContext } from "react"
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking
} from 'react-native'

import * as SecureStore from 'expo-secure-store'
import Context from "../../store/context"
import { FETCH } from '../../Helpers/FetchHelper'
import {BASE_URL} from '../../cofig'

const LoginScreen = ({ navigation }) => {

  const {state, actions} = useContext(Context);
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
  }

  const handleSubmitButton = () => {
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

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    }

    FETCH(`${BASE_URL}/accounts/token/`, options).then((data) => {
      if (data.detail !== "No active account found with the given credentials") {
        save('access' , data.access)
        save('refresh', data.refresh)

        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.access,
          }
        }

        FETCH(`${BASE_URL}/accounts/me`, options).then((data) => {
          if (data.message === 'logout_user') {
            navigation.navigate("Auth");
          } else if (data.message === 'new_token') {
            let new_options = {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data.new_access,
              }
            }
            FETCH(`${BASE_URL}/accounts/me`, new_options).then((data) => {
              actions({type: 'setState', payload: {...state, 
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_number: data.phone_number,
                is_courier: data.courier !== null ? true : false,
                courier_mode_on: false
              }})
              // navigate to the app
              navigation.navigate("DrawerNavigation")
            })
          } else {
            actions({type: 'setState', payload: {...state, 
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone_number: data.phone_number,
              is_courier: data.courier !== null ? true : false,
              courier_mode_on: false
            }})
            // navigate to the app
            navigation.navigate("DrawerNavigation")
          }
        })

      } else {
        alert('Nesprávny email alebo heslo. Skúste znovu.')
      }
    })

  }

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
                <Text style={styles.textSign}>Vytvoriť účet</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={() => { Linking.openURL('https://poslito.com/reset_password/') }}>
            <Text style={{fontSize: 16, color: "#777"}}>Zabudli ste heslo?</Text>
          </TouchableOpacity>
        
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
  forgotPassword: {
    alignItems: 'center',
    marginTop: 40
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