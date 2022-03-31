import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { callAPI } from '../../Helpers/FetchHelper'

const NewOrderItemScreen = ({route, navigation}) => {
    const [itemCategory, setItemCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemSize, setItemSize] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [itemIsFragile, setItemIsFragile] = useState('');

    // pickup place lat and long and postal code
    const [pickupPlaceLat, setPickupPlaceLat] = useState('');
    const [pickupPlaceLong, setPickupPlaceLong] = useState('');
    const [pickupPlacePostalCode, setPickupPlacePostalCode] = useState('');
    const [pickupPlaceCountry, setPickupPlaceCountry] = useState('');
    const [pickupPlaceCity, setPickupPlaceCity] = useState('');
    const [pickupPlaceStreetAddress, setPickupPlaceStreetAddress] = useState('');
    const [pickupID, setPickupID] = useState('');
    const [pickupPlaceDescription, setPickupPlaceDescription] = useState('');

    // delivery place lat and long and postal code
    const [deliveryPlaceLat, setDeliveryPlaceLat] = useState('');
    const [deliveryPlaceLong, setDeliveryPlaceLong] = useState('');
    const [deliveryPlacePostalCode, setDeliveryPlacePostalCode] = useState('');
    const [deliveryPlaceCountry, setDeliveryPlaceCountry] = useState('');
    const [deliveryPlaceCity, setDeliveryPlaceCity] = useState('');
    const [deliveryPlaceStreetAddress, setDeliveryPlaceStreetAddress] = useState('');
    const [deliveryID, setDeliveryID] = useState('');
    const [deliveryPlaceDescription, setDeliveryPlaceDescription] = useState('');

    const { FirstName, LastName, Number, Email, pickup_place, delivery_place } = route.params;

    useEffect(() => {
      // call google places API to get latitude and longtitude from place_id for pickup place
      callAPI(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${pickup_place.place_id}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`,
        'GET',
      ).then((data) => {
        for (let i = 0; i < data.result.address_components.length; i++){
          console.log(data);
          if (data.result.address_components[i].types[0] == "postal_code"){
            setPickupPlacePostalCode(data.result.address_components[i].short_name);
          }
        }
        setPickupPlaceLat(data.result.geometry.location.lat);
        setPickupPlaceLong(data.result.geometry.location.lng);
      })

      // call google places API to get latitude and longtitude from place_id for delivery place
      callAPI(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${delivery_place.place_id}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`,
        'GET',
      ).then((responseJson) => {
        // get postal code from json response
        // it has to be done in the loop, because the number of elements in the array can be different due to address number (sometimes there is no address number)
        for (let i = 0; i < responseJson.result.address_components.length; i++){
          if (responseJson.result.address_components[i].types[0] == "postal_code"){
            setDeliveryPlacePostalCode(responseJson.result.address_components[i].short_name);
          }
        }
        // get lat and long from json response
        setDeliveryPlaceLat(responseJson.result.geometry.location.lat);
        setDeliveryPlaceLong(responseJson.result.geometry.location.lng);
      })
                
      // response can be length 3/4 depending if the address has also a number
      if (pickup_place.terms.length == 3){
        setPickupPlaceStreetAddress(pickup_place.terms[0].value);
        setPickupPlaceCity(pickup_place.terms[1].value);
        setPickupPlaceCountry(pickup_place.terms[2].value);
      } else {
        setPickupPlaceStreetAddress(pickup_place.terms[0].value);
        setPickupPlaceCity(pickup_place.terms[2].value);
        setPickupPlaceCountry(pickup_place.terms[3].value);
      }

      if (delivery_place.terms.length == 3){
        setDeliveryPlaceStreetAddress(delivery_place.terms[0].value);
        setDeliveryPlaceCity(delivery_place.terms[1].value);
        setDeliveryPlaceCountry(delivery_place.terms[2].value);
      } else {
        setDeliveryPlaceStreetAddress(delivery_place.terms[0].value);
        setDeliveryPlaceCity(delivery_place.terms[2].value);
        setDeliveryPlaceCountry(delivery_place.terms[3].value);
      }

      setPickupID(pickup_place.place_id);
      setPickupPlaceDescription(pickup_place.description);

      setDeliveryID(delivery_place.place_id);
      setDeliveryPlaceDescription(delivery_place.description);
    }, []);

    const handleButton = () => {
    
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
        alert('Prosím vyberte krehkosť zásielky');
        return;
      }

      navigation.navigate("OrderCheckout",{
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Number: Number,
        itemCategory: itemCategory,
        itemDescription: itemDescription,
        itemSize: itemSize,
        itemWeight: itemWeight,
        itemIsFragile: itemIsFragile,
        pickupPlaceLat: pickupPlaceLat,
        pickupPlaceLong: pickupPlaceLong,
        pickupPlacePostalCode: pickupPlacePostalCode,
        pickupPlaceCountry: pickupPlaceCountry,
        pickupPlaceCity: pickupPlaceCity,
        pickupPlaceStreetAddress: pickupPlaceStreetAddress,
        pickupID: pickupID,
        pickupPlaceDescription: pickupPlaceDescription,
        deliveryPlaceLat: deliveryPlaceLat,
        deliveryPlaceLong: deliveryPlaceLong,
        deliveryPlacePostalCode: deliveryPlacePostalCode,
        deliveryPlaceCountry: deliveryPlaceCountry,
        deliveryPlaceCity: deliveryPlaceCity,
        deliveryPlaceStreetAddress: deliveryPlaceStreetAddress,
        deliveryID: deliveryID,
        deliveryPlaceDescription: deliveryPlaceDescription
      });
    };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <ScrollView>
              <Text style={[styles.text_header, {marginTop: 20 }]}>Kategória</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemCategory(value)}
                placeholder={{ label: "Vyberte kategóriu", value: null }}
                items={[
                    { label: 'List', value: 'List' },
                    { label: 'Balík', value: 'Balik' },
                    { label: 'Iné', value: 'Nadrozmerny objekt' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Popis</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(Description) => setItemDescription(Description)}
                    placeholder="Zadajte popis zásielky"
                /> 
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>Veľkosť</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemSize(value)}
                placeholder={{ label: "Vyberte veľkosť", value: null }}
                items={[
                    { label: 'Malé (< 30 cm)', value: 'small' },
                    { label: 'Stredné (< 1 m)', value: 'medium' },
                    { label: 'Veľké (> 1 m)', value: 'large' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Hmotnosť</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemWeight(value)}
                placeholder={{ label: "Vyberte hmotnosť", value: null }}
                items={[
                    { label: 'Ľahké (< 200 g)', value: 'light' },
                    { label: 'Stredne ťažké (< 1 kg)', value: 'medium' },
                    { label: 'Ťažké (> 1 kg)', value: 'heavy' },
                ]}
              />
              <Text style={[styles.text_header, {marginTop: 20}]}>Je zásielka krehká?</Text>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                onValueChange={(value) => setItemIsFragile(value)}
                placeholder={{ label: "Vyberte moznost", value: null }}
                items={[
                    { label: 'Áno', value: 'true' },
                    { label: 'Nie', value: 'false' },
                ]}
              />
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

export default NewOrderItemScreen;

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
