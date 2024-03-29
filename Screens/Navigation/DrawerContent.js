import React, {useState, useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Title,
    Drawer,
    Text,
    Switch,
    Caption
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';

import Context from '../../store/context';

export function DrawerContent(props, route) {

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const {state, actions} = useContext(Context)
    const [currentLocationLat, setCurrentLocationLat] = React.useState();
    const [currentLocationLon, setCurrentLocationLon] = React.useState();

    useEffect(() => {
        setIsSwitchOn(state.courier_mode_on)
    }, [state.courier_mode_on])

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
            actions({type: 'setState', payload: {...state, 
                courier_mode_on: false
            }});
            props.navigation.navigate("TabScreen");
        }
    }

    // if courier is true -> then display switch component, otherwise return null
    const com = state.is_courier ? (
        <View style={styles.changeToCourier}>
            <Text style={styles.changeToCourierText}>Kuriérska časť</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#393485"/>
        </View>
    ) : null;

    const becomeACourierOption = !state.is_courier ? (
        <DrawerItem 
            icon={({color, size}) => (
                <Icon 
                    name='car'
                    color={color}
                    size={size}
                />
            )}
            label="Stať sa kuriérom"
            onPress={() => props.navigation.navigate("CourierScreenStack")}
        />
    ) : null;

    // function for log out, we need to delete access token and refresh token
    const deleteToken = async () => {
        try {
            // delete access token
            await SecureStore.deleteItemAsync('access');
            await SecureStore.deleteItemAsync('refresh');

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
                        <View style={{flexDirection:'row', marginTop: 15, borderBottomColor: '#f4f4f4', paddingLeft: 15, borderBottomWidth: 1, paddingBottom: 15}}>
                            <Avatar
                                containerStyle={{backgroundColor: '#393485', marginTop: 10}}
                                size="medium"
                                rounded
                                icon={{ name: 'person' }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <View style={{marginLeft:15, marginTop: 5}}>
                                <Title style={styles.title}>{state.first_name + ' ' + state.last_name}</Title>
                                <Caption>{state.email}</Caption>
                            </View>
                        </View>
                    </View>
                    { !isSwitchOn ? (
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                        name='home-outline'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                isEnabled={false}
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
                            <DrawerItem 
                                icon={({color, size}) => (
                                    <Icon 
                                        name='information-outline'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="O aplikácii"
                                onPress={() => {props.navigation.navigate("InfoScreenStack")}}
                            />
                        </Drawer.Section>
                    ) : (
                        <View>
                            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                <Icon 
                                        name='car'
                                        color={'#393485'}
                                        size={60}
                                        style={{marginTop: 20}}
                                    />
                                <Text style={styles.courierAppText}>Ste prihlásený ako Doručovateľ</Text>
                            </View>
                            <Drawer.Section style={styles.drawerSectionCourier}>
                                <DrawerItem 
                                    icon={({color, size}) => (
                                        <Icon 
                                            name='truck-delivery-outline'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    isEnabled={false}
                                    label="Aktívne zásielky"
                                    onPress={() => {props.navigation.navigate("CourierMainScreen")}}
                                />
                                <DrawerItem 
                                    icon={({color, size}) => (
                                        <Icon 
                                            name='email-outline'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    isEnabled={false}
                                    label="História doručovania"
                                    onPress={() => {props.navigation.navigate("CourierHistoryScreen")}}
                                />
                            </Drawer.Section>
                        </View>
                    ) }
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
      paddingLeft: 0,
    },
    title: {
      fontSize: 16,
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
      marginTop: 5,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    drawerSectionCourier: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: 1,
        marginTop: 20
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
    },
    courierAppText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'green',
        marginTop: 5
    },
    tinyLogo: {
        width: 50,
        height: 50,
    }
  });