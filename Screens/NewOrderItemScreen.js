import React, {useState} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const NewOrderItemScreen = ({route, navigation}) => {
    const [itemCategory, setItemCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemSize, setItemSize] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [itemIsFragile, setItemIsFragile] = useState('');

    const { FirstName, LastName, Number, Email } = route.params;

    const handleButton = async () => {
      if (!itemCategory) {
        alert('Prosím vyberte kategóriu');
        return;
      }
  
      if (!itemDescription) {
        alert('Prosím zadajte popis');
        return;
      }
  
      if (!itemSize) {
        alert('Prosím vyberte veľkosť');
        return;
      }
  
      if (!itemWeight) {
        alert('Prosím vyberte hmotnosť');
        return;
      }

      if (!itemIsFragile) {
        alert('Prosím vyberte krehkost zasielky');
        return;
      }

      let formData = new FormData();

      formData.append("item.name", itemCategory);
      formData.append("item.description", itemDescription);
      formData.append("item.size", itemSize);
      formData.append("item.weight", itemWeight);
      formData.append("item.fragile", itemIsFragile);
      formData.append("receiver.first_name", FirstName);
      formData.append("receiver.last_name", LastName);
      formData.append("receiver.email", Email);
      formData.append("receiver.phone_number", Number);


      try {
        await AsyncStorage.getItem('@access_token').then((token) => {
            console.log(token);
            if (token != null) {
              fetch('http://147.175.150.96/api/core/create_delivery/', {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': 'Bearer ' + token,
                }
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  
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

    };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <KeyboardAvoidingView>
              <Text style={[styles.text_header, {marginTop: 20 }]}>Kategoria produktu</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemCategory(value)}
                placeholder={{ label: "Vyberte kategoriu", value: null }}
                items={[
                    { label: 'List', value: 'List' },
                    { label: 'Balik', value: 'Balik' },
                    { label: 'Nadrozmerny objekt', value: 'Nadrozmerny objekt' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Popis</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(Description) => setItemDescription(Description)}
                    placeholder="Zadajte popis"
                /> 
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>Velkost</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemSize(value)}
                placeholder={{ label: "Vyberte velkost", value: null }}
                items={[
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Hmotnost</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemWeight(value)}
                placeholder={{ label: "Vyberte hmotnost", value: null }}
                items={[
                    { label: 'Light', value: 'light' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Heavy', value: 'heavy' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Je zasielka krehka?</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemIsFragile(value)}
                placeholder={{ label: "Vyberte moznost", value: null }}
                items={[
                    { label: 'Ano', value: true },
                    { label: 'Nie', value: false },
                ]}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
              <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
                  <Text style={styles.textSign}>Odoslat objednavku</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

export default NewOrderItemScreen;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2
      },
      footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      text_header: {
        color: '#05375a',
        fontSize: 18
      },
      action: {
        flexDirection: 'row',
        marginTop: 6,
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
        marginTop: 20
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
	},
};
