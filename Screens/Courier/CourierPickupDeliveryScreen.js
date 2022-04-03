import React, { useState, useRef } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as SecureStore from 'expo-secure-store';
import { callAPI, callRefreshToken } from '../../Helpers/FetchHelper'

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

    const handleButton = async () => {
        try {
            await SecureStore.getItemAsync('access').then((token) => {
                if (token != null) {
                    callAPI(
                        `http://147.175.150.96/api/deliveries/${safeID}/state`,
                        'PATCH',
                        {
                            'Authorization': 'Bearer ' + token,
                        },
                        JSON.stringify({ state: "delivering" })
                    ).then((data) => {
                        if (data.code !== 'token_not_valid') {
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
                        } else {
                            SecureStore.getItemAsync('refresh').then((refreshToken) => {
                              // if access token is invalid => call refresh token
                              callRefreshToken(refreshToken).then((data) => {
                                // save new access and refresh token
                                save('access', data.access)
                                save('refresh', data.refresh)
              
                                callAPI(
                                    `http://147.175.150.96/api/deliveries/${safeID}/state`,
                                    'PATCH',
                                    {
                                        'Authorization': 'Bearer ' + token,
                                    },
                                    JSON.stringify({ state: "delivering" })
                                ).then((data) => {
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
                                })
                              })
                            })
                        }
                    })
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
        flex: 3
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    button: {
        alignItems: 'center',
        marginTop: 12
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