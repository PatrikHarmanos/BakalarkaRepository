import React, {useEffect, useState} from 'react';
import {
    View, 
    Button,
    StyleSheet,
    Dimensions,
    FlatList
  } from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation
} from 'react-native-paper';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CourierMainScreen = ({navigation}) => {

    const [currentLocationLat, setCurrentLocationLat] = React.useState();
    const [currentLocationLon, setCurrentLocationLon] = React.useState();
    const [data, setData] = useState();
    const [distance, setDistance] = useState();
    
    const [pickupPlacePostalCode, setPickupPlacePostalCode] = useState();
    const [pickupPlaceLat, setPickupPlaceLat] = useState();
    const [pickupPlaceLong, setPickupPlaceLong] = useState();
    const [deliveryPlacePostalCode, setDeliveryPlacePostalCode] = useState();
    const [deliveryPlaceLat, setDeliveryPlaceLat] = useState();
    const [deliveryPlaceLong, setDeliveryPlaceLong] = useState();

    useEffect(() => {
        getLocation();
    })

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocationLat(location["coords"]["latitude"]);
            setCurrentLocationLon(location["coords"]["longitude"]);
        } catch (error) {
            console.log(error);
        }

        try {
            await AsyncStorage.getItem('@access_token').then((token) => {
                console.log(token);
                if (token != null) {
                    fetch(`http://147.175.150.96/api/couriers/closest_deliveries/?lon=${currentLocationLon}&lat=${currentLocationLat}`, {
                        method: "GET",
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    })
                    .then((response) => response.json())
                    .then ((responseJson) => {
                        setData(responseJson);
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

        // call google places API to get latitude and longtitude from place_id for pickup place
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${data[0]["pickup_place"]["place_id"]}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
            for (let i = 0; i < responseJson.result.address_components.length; i++){
                if (responseJson.result.address_components[i].types[0] == "postal_code"){
                setPickupPlacePostalCode(responseJson.result.address_components[i].short_name);
                }
            }
            setPickupPlaceLat(responseJson.result.geometry.location.lat);
            setPickupPlaceLong(responseJson.result.geometry.location.lng);
            
            })
            .catch((error) => {
            console.log(error);
            });

        // call google places API to get latitude and longtitude from place_id for delivery place
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${data[0]["delivery_place"]["place_id"]}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`, {
                method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
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
            .catch((error) => {
            console.log(error);
            });

    }

    const handleButton = () => {
  
        navigation.navigate("CourierDeliveryScreen", {
          itemDescription: data[0]["item"]["description"],
          itemSize: data[0]["item"]["size"],
          itemWeight: data[0]["item"]["weight"],
          itemIsFragile: data[0]["item"]["fragile"],
          pickupPlaceLat: pickupPlaceLat,
          pickupPlaceLong: pickupPlaceLong,
          pickupPlacePostalCode: pickupPlacePostalCode,
          pickupPlaceCountry: data[0]["pickup_place"]["country"],
          pickupPlaceCity: data[0]["pickup_place"]["city"],
          pickupPlaceStreetAddress: data[0]["pickup_place"]["street_address"],
          pickupID: data[0]["pickup_place"]["place_id"],
          pickupPlaceDescription: data[0]["pickup_place"]["formatted_address"],
          deliveryPlaceLat: deliveryPlaceLat,
          deliveryPlaceLong: deliveryPlaceLong,
          deliveryPlacePostalCode: deliveryPlacePostalCode,
          deliveryPlaceCountry: data[0]["delivery_place"]["country"],
          deliveryPlaceCity: data[0]["delivery_place"]["city"],
          deliveryPlaceStreetAddress: data[0]["delivery_place"]["street_address"],
          deliveryID: data[0]["delivery_place"]["place_id"],
          deliveryPlaceDescription: data[0]["delivery_place"]["formatted_address"]
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>Aktualne zasielky</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.safe_id}
                renderItem={({ item }) => 
                    <TouchableOpacity style={styles.item} onPress={handleButton}> 
                        <Text style={styles.orderTitle}>
                            {item.pickup_place.formatted_address}
                        </Text>
                        <Text style={styles.orderSubTitle}>
                            dsadfasx
                        </Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );

};
export default CourierMainScreen;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      textHeading: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#777777'
      },
      item: {
        backgroundColor: '#393485',
        padding: 20,  
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 18
      },
      orderTitle: {
        fontSize: 21,
        marginBottom: 4,
        color: '#fff',
        fontWeight: 'bold'
      },
      orderSubTitle: {
        fontSize: 16,
        color: '#cdc8de'
      }
});