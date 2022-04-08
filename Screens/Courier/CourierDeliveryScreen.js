import React, { useState, useRef, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getPreciseDistance } from 'geolib';
import * as SecureStore from 'expo-secure-store';
import { callAPI, callRefreshToken } from '../../Helpers/FetchHelper'

const CourierDeliveryScreen = ({route, navigation}) => {
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

    const [distance, setDistance] = useState(0);
    const mapRef = useRef();

    const calculatePreciseDistance = () => {
        var pdis = getPreciseDistance(
          { latitude: pickupPlaceLat, longitude: pickupPlaceLong },
          { latitude: deliveryPlaceLat, longitude: deliveryPlaceLong }
        );
       setDistance((pdis/1000).toFixed(2));
    };

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value)
    }

    useEffect(async () => {
        calculatePreciseDistance();
    }, []);

    const handleButton = async () => {
    
        try {
            await SecureStore.getItemAsync('access').then((token) => {
                if (token != null) {
                    callAPI(
                        `http://147.175.150.96/api/deliveries/${safeID}/state`,
                        'PATCH',
                        {
                            'content-type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        JSON.stringify({ state: "assigned" })
                    ).then((data) => {
                        if (data.code !== 'token_not_valid') {
                            navigation.navigate("CourierPickupDeliveryScreen", {
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
                              });
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
                                            'content-type': 'application/json',
                                            'Authorization': 'Bearer ' + token
                                        },
                                        JSON.stringify({ state: "assigned" })
                                    ).then((data) => {
                                        navigation.navigate("CourierPickupDeliveryScreen", {
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
                                        });
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
                initialRegion={{
                    latitude: parseFloat(pickupPlaceLat),
                    longitude: parseFloat(pickupPlaceLong),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0922
                }}
                >
                    <Marker 
                        coordinate={{
                            latitude: parseFloat(pickupPlaceLat),
                            longitude: parseFloat(pickupPlaceLong),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0922
                        }}
                    />
                    <Marker 
                        coordinate={{
                            latitude: parseFloat(deliveryPlaceLat),
                            longitude: parseFloat(deliveryPlaceLong),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0922
                        }}
                    />
                    <MapViewDirections
                        origin={{
                            latitude: parseFloat(pickupPlaceLat),
                            longitude: parseFloat(pickupPlaceLong),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0922
                        }}
                        destination={{
                            latitude: parseFloat(deliveryPlaceLat),
                            longitude: parseFloat(deliveryPlaceLong),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0922
                        }}
                        apikey={"AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY"}
                        strokeWidth={3}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        onReady={ result => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 50,
                                    left: 30,
                                    top: 50
                                }
                            })
                        }}
                    />  
                </MapView>
            </View>
            <View style={styles.footer}>
                <View style={styles.footer_section}>
                    <Text style={styles.footer_section_text}>Miesto vyzdvihnutia</Text>
                    <Text style={styles.footer_section_value}>{pickupPlaceDescription} </Text>
                </View>
                <View style={styles.footer_section}>
                    <Text style={styles.footer_section_text}>Miesto doručenia</Text>
                    <Text style={styles.footer_section_value}>{deliveryPlaceDescription}</Text>
                </View>
                <View style={styles.footer_section}>
                    <Text style={styles.footer_section_text}>Vzdialenosť</Text>
                    <Text style={styles.footer_section_value}>{distance} km</Text>
                </View>
                <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleButton}>
                            <Text style={styles.textSign}>Akceptovať objednávku</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    ); 
}

export default CourierDeliveryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 2
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
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
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