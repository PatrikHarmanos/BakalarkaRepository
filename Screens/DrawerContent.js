import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import CourierMainScreen from './CourierMainScreen';

export function DrawerContent(props) {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isCourier, setIsCourier] = useState(true);

    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    useEffect(() => {
        getUserInfo();
    })
    
    const getUserInfo = async () => {
        setEmail(await AsyncStorage.getItem('@email'));
        setFirstName(await AsyncStorage.getItem('@first_name'));
        setLastName(await AsyncStorage.getItem('@last_name'));
    }

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        // If the switch turns on -> go to main courier part of the application
        if (!isSwitchOn){
            getDeliveries();
        // if the switch turns off -> go back to user application (home screen)
        } else {
            props.navigation.navigate("TabScreen");
        }
    }

    // if courier is true -> then display switch component, otherwise return null
    const com = isCourier ? (
        <View style={styles.changeToCourier}>
                <Text style={styles.changeToCourierText}>Kuriérska časť</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#393485"/>
        </View>
    ) : null;

    const [currentLocationLat, setCurrentLocationLat] = React.useState();
    const [currentLocationLon, setCurrentLocationLon] = React.useState();
    const [data, setData] = useState();

    const [pickupPlacePostalCode, setPickupPlacePostalCode] = useState();
    const [pickupPlaceLat, setPickupPlaceLat] = useState();
    const [pickupPlaceLong, setPickupPlaceLong] = useState();
    const [deliveryPlacePostalCode, setDeliveryPlacePostalCode] = useState();
    const [deliveryPlaceLat, setDeliveryPlaceLat] = useState();
    const [deliveryPlaceLong, setDeliveryPlaceLong] = useState();

    const getDeliveries = async () => {
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
            await SecureStore.getItemAsync('access').then((token) => {
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

        if (data.length > 0) {
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
       console.log(data);
        props.navigation.navigate("courierScreenStack", { 
            screen: 'CourierMainScreen',
            params: {
                data: data,
                pickupPlacePostalCode: pickupPlacePostalCode,
                pickupPlaceLat: pickupPlaceLat,
                pickupPlaceLong: pickupPlaceLong,
                deliveryPlacePostalCode: deliveryPlacePostalCode,
                deliveryPlaceLat: deliveryPlaceLat,
                deliveryPlaceLong: deliveryPlaceLong
            }
        })
    }

    const becomeACourierOption = !isCourier ? (
        <DrawerItem 
            icon={({color, size}) => (
                <Icon 
                    name='progress-wrench'
                    color={color}
                    size={size}
                />
            )}
            label="Stat sa kurierom"
            onPress={() => props.navigation.navigate("courierScreenStack")}
        />
    ) : null;

    // function for log out, we need to delete access token
    // !!! also delete refresh token
    const deleteToken = async () => {
        try {
            // delete access token
            await SecureStore.deleteItemAsync('access');

            // delete user info from async storage
            await AsyncStorage.removeItem('@email');
            await AsyncStorage.removeItem('@first_name');
            await AsyncStorage.removeItem('@last_name');
            await AsyncStorage.removeItem('@phone_number');

            // navigate to splash screen
            props.navigation.navigate("SplashScreen");
        } catch(error) {
          console.log(error);
        }
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image 
                                    source={{
                                        uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    }}
                                    size={50}
                                />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{firstName + ' ' + lastName}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                                name='home-outline'
                                color={color}
                                size={size}
                            />
                        )}
                        label="Domov"
                        onPress={() => {props.navigation.navigate("Domov")}}
                        />
                        <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                                name='progress-wrench'
                                color={color}
                                size={size}
                            />
                        )}
                        label="Nastavenia"
                        onPress={() => {props.navigation.navigate("settingsScreenStack")}}
                        />
                        {becomeACourierOption}
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            {com}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                            name='exit-to-app'
                            color={color}
                            size={size}
                        />
                    )}
                    label="Odhlásiť sa"
                    onPress={deleteToken}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    changeToCourier: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20
    },
    changeToCourierText: {
        fontSize: 18,
        color: '#b5b5b5',
        fontWeight: 'bold'
    }
  });