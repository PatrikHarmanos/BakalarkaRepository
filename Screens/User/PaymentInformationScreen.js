import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const PaymentInformationScreen = () =>{

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text style={[styles.text_footer, {marginTop: 5}]}>Číslo vašej karty:</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(FirstName) => setFirstName(FirstName)}
              placeholder="Zadajte číslo karty"
          /> 
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Platnosť karty do:</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    style={pickerStyle}
                    onValueChange={(value) => setCardMonth(value)}
                    placeholder={{ label: "Vyberte mesiac", value: null }}
                    items={[
                        { label: '01', value: '01' },
                        { label: '02', value: '02' },
                        { label: '03', value: '03' },
                        { label: '04', value: '04' },
                        { label: '05', value: '05' },
                        { label: '06', value: '06' },
                        { label: '07', value: '07' },
                        { label: '08', value: '08' },
                        { label: '09', value: '09' },
                        { label: '10', value: '10' },
                        { label: '11', value: '11' },
                        { label: '12', value: '12' },
                    ]}
            />
            <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setCardYear(value)}
                placeholder={{ label: "Vyberte rok", value: null }}
                items={[
                    { label: '2021', value: '2021' },
                    { label: '2022', value: '2022' },
                    { label: '2023', value: '2023' },
                    { label: '2024', value: '2024' },
                    { label: '2026', value: '2025' },
                    { label: '2027', value: '2026' },
                ]}
            />
        </View>
        <Text style={[styles.text_footer, {marginTop: 35}]}>Overovací kód:</Text>
        <View style={styles.action}>
          <TextInput style={styles.textInput}
              onChangeText={(LastName) => setLastName(LastName)}
              placeholder="Zadajte overovací kód"
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn}>
              <Text style={styles.textSign}>Zmeniť údaje</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>      
    </View>
      
  );
};

export default PaymentInformationScreen;

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

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 8,
		paddingHorizontal: 10,
		paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
	},
	inputAndroid: {
		color: 'black',
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15
	}
};