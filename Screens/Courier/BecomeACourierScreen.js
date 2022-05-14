import React, { useState } from 'react';
import {
    View, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert
  } from 'react-native'; 

import {
  Text
} from 'react-native-paper';

const BecomeACourierScreen = ({navigation}) => {

  const [numberOP, setNumberOP] = useState(''); 
  const [validOP, setValidOP] = useState('');
  const [numberVP, setNumberVP] = useState('');
  const [validVP, setValidVP] = useState('');

  const handleButton = () => {
    if (!numberOP) {
      Alert.alert('Prosím zadajte číslo OP');
      return;
    }
    if (!validOP) {
      Alert.alert('Prosím zadajte dátum platnosti OP');
      return;
    }
    if (!numberVP) {
      Alert.alert('Prosím zadajte číslo VP');
      return;
    }
    if (!validVP) {
      Alert.alert('Prosím zadajte dátum platnosti VP');
      return;
    }
    navigation.navigate("BecomeACourierMoreInfo", {
      numberOP: numberOP,
      validOP: validOP,
      numberVP: numberVP,
      validVP: validVP
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <ScrollView>
        <Text style={[styles.text_header, {marginTop: 20}]}>Číslo občianského preukazu</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setNumberOP(value)}
            placeholder="Zadajte číslo OP"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>Dátum platnosti OP &#40;RRRR-MM-DD&#41;</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setValidOP(value)}
            placeholder="Zadajte dátum platnosti OP"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>Číslo vodičského preukazu</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setNumberVP(value)}
            placeholder="Zadajte číslo VP"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>Dátum platnosti VP &#40;RRRR-MM-DD&#41;</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setValidVP(value)}
            placeholder="Zadajte dátum platnosti VP"
        /> 
        </View>
    </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.button}>
          <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
              <Text style={styles.textSign}>Pokračovať</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BecomeACourierScreen;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 4,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 50
  },
  text_header: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 15
  },
  button: {
    alignItems: 'center',
    marginTop: 20
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