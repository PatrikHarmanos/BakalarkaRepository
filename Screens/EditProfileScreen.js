import React from "react";
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

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class EditProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: null,
      first_name: null,
      last_name: null,
      phone_number: null
    };
  }

  componentDidMount(){
    this.callAPI();
  }

  callAPI = async () => {
    try {
        await AsyncStorage.getItem('@access_token').then((token) => {
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
                    this.setState({ email: responseJson.email, first_name: responseJson.person.first_name, last_name: responseJson.person.last_name, phone_number: responseJson.person.phone_number })
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
  }

  render() {

    const handleRegisterButton = () => {
      if (!this.state.first_name) {
        alert('Please fill First Name');
        return;
      }
      if (!this.state.last_name) {
        alert('Please fill Last Name');
        return;
      }
      if (!this.state.phone_number) {
        alert('Please fill Number');
        return;
      }
      if (!this.state.email) {
        alert('Please fill Email');
        return;
      }
  
      var dataToSend = {
        email: this.state.email,
        person: {
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number
        }
      }
  
      fetch('http://147.175.150.96/api/account/my_account/', {
        method: 'PATCH',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={[styles.text_footer, {marginTop: 5}]}>Meno</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(FirstName) => this.setState({first_name: FirstName})}
                placeholder="Zadajte meno"
                defaultValue={this.state.first_name}
            /> 
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Priezvisko</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(LastName) => this.setState({last_name: LastName})}
                placeholder="Zadajte priezvisko"
                defaultValue={this.state.last_name}
            />
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Email</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(Email) => this.setState({email: Email})}
                placeholder="Zadajte Email"
                defaultValue={this.state.email}
            /> 
          </View>
          <Text style={[styles.text_footer, {marginTop: 35}]}>Telefónne číslo</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(Number) => this.setState({phone_number: Number})}
                placeholder="Zadajte telefónne číslo"
                defaultValue={this.state.phone_number}
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
  }
};

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
    backgroundColor: '#0075db'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});