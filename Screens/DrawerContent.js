import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    ActivityIndicator
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import CourierMainScreen from './CourierMainScreen';
import { Avatar } from 'react-native-elements';

export function DrawerContent(props) {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isCourier, setIsCourier] = useState(false);

    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    useEffect(() => {
        getUserInfo();
    }, [])
    
    const getUserInfo = async () => {
        setEmail(await AsyncStorage.getItem('@email'));
        setFirstName(await AsyncStorage.getItem('@first_name'));
        setLastName(await AsyncStorage.getItem('@last_name'));
        setIsCourier(await AsyncStorage.getItem('@is_courier'));
    }

    const [currentLocationLat, setCurrentLocationLat] = React.useState();
    const [currentLocationLon, setCurrentLocationLon] = React.useState();

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
    }

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        // If the switch turns on -> go to main courier part of the application
        if (!isSwitchOn){
            //getLocation();
            props.navigation.navigate("CourierScreenStack", { screen: 'CourierMainScreen' , params: {
                currentLocationLat: currentLocationLat,
                currentLocationLon: currentLocationLon
            }});
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

    const becomeACourierOption = !isCourier ? (
        <DrawerItem 
            icon={({color, size}) => (
                <Icon 
                    name='progress-wrench'
                    color={color}
                    size={size}
                />
            )}
            label="Stať sa kuriérom"
            onPress={() => props.navigation.navigate("CourierScreenStack")}
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
                            <Avatar
                                containerStyle={{backgroundColor: '#393485'}}
                                size="medium"
                                rounded
                                icon={{ name: 'person' }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
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
                        onPress={() => {props.navigation.navigate("SettingsScreenStack")}}
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