import React, {useState} from 'react';
import {
    View, 
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput
  } from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation
} from 'react-native-paper';

import RNPickerSelect from 'react-native-picker-select';
import * as SecureStore from 'expo-secure-store';

const BecomeACourierMoreInfoScreen = ({navigation}) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [psc, setPsc] = useState('');
    const [vehicle, setVehicle] = useState('');

  const handleButton = async () => {
    if (!address) {
      alert('Prosím zadajte adresu');
      return;
    }
    if (!city) {
      alert('Prosím zadajte mesto');
      return;
    }
    if (!psc) {
      alert('Prosím zadajte PSČ');
      return;
    }

    let home_address = address + ", " + city + ", " + psc;
    let formData = new FormData();
    // formData.append("vehicle_type", vehicle);
    formData.append("home_address", home_address);

    try {
      await SecureStore.getItemAsync('access').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/couriers/become_courier/', {
                  method: "POST",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
                  body: formData
              })
              .then((response) => response.json())
              .then ((responseJson) => {
                  console.log(responseJson);
              })
              .catch((error) => {
                  console.log(error);
              });
          } else {
              navigation.navigate("Auth");
          }
      })
    } catch(error) {
        console.log(error);
    }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <ScrollView>
        <Text style={[styles.text_header, {marginTop: 20}]}>Adresa</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setAddress(value)}
            placeholder="Zadajte adresu"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>Mesto</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setCity(value)}
            placeholder="Zadajte mesto"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>PSČ</Text>
        <View style={styles.action}>
        <TextInput style={styles.textInput} onChangeText={(value) => setPsc(value)}
            placeholder="Zadajte PSČ"
        /> 
        </View>
        <Text style={[styles.text_header, {marginTop: 20}]}>Kategória doručovacieho vozidla</Text>
        <RNPickerSelect
        useNativeAndroidPickerStyle={false}
        style={pickerStyle}
        onValueChange={(value) => setVehicle(value)}
        placeholder={{ label: "Vyberte kategóriu vozidla", value: null }}
        items={[
            { label: 'dodávka', value: 'dodávka' },
            { label: 'auto', value: 'auto' },
            { label: 'bicykel', value: 'bicykel' },
            { label: 'kolobežka', value: 'kolobežka' },
            { label: 'iné', value: 'iné' },
        ]}
        />
    </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.button}>
          <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
              <Text style={styles.textSign}>Dokončiť registráciu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default BecomeACourierMoreInfoScreen;

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
		right: 15,
	}
};