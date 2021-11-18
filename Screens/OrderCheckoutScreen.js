import React, {useState, useRef, useEffect} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    KeyboardAvoidingView,
    TextInput,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getPreciseDistance } from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderCheckoutScreen = ({route, navigation}) => {
    const { 
        FirstName,
        LastName, 
        Number, 
        Email, 
        itemCategory,
        itemDescription,
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
        deliveryPlaceDescription
    } = route.params;

    const [distance, setDistance] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [finalTime, setFinalTime] = useState(0);

    const mapRef = useRef();

    const calculatePreciseDistance = () => {
        var pdis = getPreciseDistance(
          { latitude: pickupPlaceLat, longitude: pickupPlaceLong },
          { latitude: deliveryPlaceLat, longitude: deliveryPlaceLong }
        );
       setDistance((pdis/1000).toFixed(2));
    };

    const calculateFinalPrice = () => {
        setFinalPrice((distance*0.4).toFixed(2));
    };

    const calculateFinalTime = () => {
        setFinalTime((distance*1.5).toFixed(0));
    };

    useEffect(() => {
        calculatePreciseDistance();
        calculateFinalPrice();
        calculateFinalTime();
    });

    const handleButton = async () => {

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
        formData.append("pickup_place.place_id", pickupID);
        formData.append("pickup_place.formatted_address", pickupPlaceDescription);
        formData.append("pickup_place.country", pickupPlaceCountry);
        formData.append("pickup_place.city", pickupPlaceCity);
        formData.append("pickup_place.street_address", pickupPlaceStreetAddress);
        formData.append("pickup_place.postal_code", pickupPlacePostalCode);
        formData.append("pickup_place.coordinates", `POINT(${pickupPlaceLong} ${pickupPlaceLat})`);
        formData.append("delivery_place.place_id", deliveryID);
        formData.append("delivery_place.formatted_address", deliveryPlaceDescription);
        formData.append("delivery_place.country", deliveryPlaceCountry);
        formData.append("delivery_place.city", deliveryPlaceCity);
        formData.append("delivery_place.street_address", deliveryPlaceStreetAddress);
        formData.append("delivery_place.postal_code", deliveryPlacePostalCode);
        formData.append("delivery_place.coordinates", `POINT(${deliveryPlaceLong} ${deliveryPlaceLat})`);

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

        navigation.navigate("Orders");
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
                                    bottom: 150,
                                    left: 30,
                                    top: 100
                                }
                            })
                        }}
                    />  
                </MapView>
            </View>
            <View style={styles.footer}>
                
                    <View style={styles.footer_section}>
                        <Text style={styles.footer_section_text}>Cena</Text>
                        <Text style={styles.footer_section_value}>{finalPrice} €</Text>
                    </View>
                    <View style={styles.footer_section}>
                        <Text style={styles.footer_section_text}>Vydialenosť</Text>
                        <Text style={styles.footer_section_value}>{distance} km</Text>
                    </View>
                    <View style={styles.footer_section}>
                        <Text style={styles.footer_section_text}>Doba doručenia</Text>
                        <Text style={styles.footer_section_value}>{finalTime} minút</Text>
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={handleButton}>
                            <Text style={styles.textSign}>Potvrdiť objednávku</Text>
                        </TouchableOpacity>
                    </View>
                
            </View>
        </View>
    ); 
}

export default OrderCheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 3
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
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
    },
    footer_section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    footer_section_value: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer_section_text: {
        fontSize: 16
    }
});