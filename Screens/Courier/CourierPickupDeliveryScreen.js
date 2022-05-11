import React, { useEffect, useRef } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import { FETCH } from '../../Helpers/FetchHelper';
import { BASE_URL } from '../../cofig';
import * as Location from "expo-location";

const CourierPickupDeliveryScreen = ({route, navigation}) => {
    const { 
        itemName,
        itemDescription,
        itemPhoto,
        itemSize,
        itemWeight,
        itemIsFragile,
        pickupPlaceLat,
        pickupPlaceLong,
        pickupPlacePostalCode,
        pickupPlaceCountry,
        pickupPlaceCity,
        pickupPlaceStreetAddress,
        pickupID,
        pickupPlaceDescription,
        deliveryPlaceLat,
        deliveryPlaceLong,
        deliveryPlacePostalCode,
        deliveryPlaceCountry,
        deliveryPlaceCity,
        deliveryPlaceStreetAddress,
        deliveryID,
        deliveryPlaceDescription,
        safeID
    } = route.params;

    const mapRef = useRef();

    var ws = undefined 

    useEffect(async () => {
        await SecureStore.getItemAsync('access').then((token) => {
            ws = new WebSocket(`wss://poslito.com/ws/couriers/?token=${token}`)
        })
    }, [])

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        let location = await Location.getCurrentPositionAsync({})
        return location
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (ws !== undefined) {
                getCurrentLocation().then((data) => {
                    ws.send(JSON.stringify({
                        "latitude": data["coords"]["latitude"],
                        "longitude": data["coords"]["longitude"]
                    }))
                })
            }
        }, 4000)
        return () => clearInterval(interval)
    })

    const navigateNext = () => {
        navigation.navigate("CourierActiveDeliveryScreen", {
            itemName: itemName,
            itemDescription: itemDescription,
            itemPhoto: itemPhoto,
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
            deliveryPlaceDescription: deliveryPlaceDescription,
            safeID: safeID,
        })
    }

    const handleButton = async () => {
        await SecureStore.getItemAsync('access').then((token) => {
            if (token != null) {
                const options = {
                    method: 'PATCH',
                    headers: { 'Authorization': 'Bearer ' + token },
                    body: JSON.stringify({ state: "delivering" })
                }

                FETCH(`${BASE_URL}/deliveries/${safeID}/state/`, options).then((data) => {
                    if (data.message === 'logout_user') {
                        navigation.navigate("Auth");
                    } else if (data.message === 'new_token') {
                        const new_options = {
                            method: 'PATCH',
                            headers: { 'Authorization': 'Bearer ' + data.new_access },
                            body: JSON.stringify({ state: "delivering" })
                        }
                        FETCH(`${BASE_URL}/deliveries/${safeID}/state/`, new_options).then((data) => {
                            navigateNext()
                        })
                    } else {
                        navigateNext()
                    }
                })
            } else {
                navigation.navigate("Auth");
            }
        })
    };
        
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MapView
                    ref={mapRef}
                    style={styles.container}
                >
                    <Marker 
                        coordinate={{
                            latitude: parseFloat(pickupPlaceLat),
                            longitude: parseFloat(pickupPlaceLong),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0922
                        }}
                    />
                </MapView>
            </View>
            <View style={styles.footer}>
                <View style={styles.footer_section}>
                    <Text style={styles.footer_section_text}>Miesto vyzdvihnutia</Text>
                    <Text style={styles.footer_section_value}>{pickupPlaceDescription}</Text>
                </View>
                <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleButton}>
                            <Text style={styles.textSign}>Zasielka bola vyzdvihnuta</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    ); 
}

export default CourierPickupDeliveryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 4
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: 'center',
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
    },
    footer_section: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    footer_section_value: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer_section_text: {
        fontSize: 15,
        color: '#777',
        marginBottom: 5
    }
});