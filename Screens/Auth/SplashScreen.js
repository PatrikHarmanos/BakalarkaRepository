import React, { useContext } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from '../../store/context';
import { FETCH } from '../../Helpers/FetchHelper' 
import {BASE_URL} from '../../cofig'

const SplashScreen = ({navigation}) => {

    const {state, actions} = useContext(Context);

    const handleEnterAppButton = async () => {

        await SecureStore.getItemAsync('access').then((token) => {
            if (token != null) {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token 
                    }
                }
                FETCH(`${BASE_URL}/accounts/me/`, options).then((data) => {
                    if (data.message === 'logout_user' || data.code === 'user_not_found') {
                        navigation.navigate("Auth");
                    } else if (data.message === 'new_token') {
                        let new_options = {
                            method: 'GET',
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + data.new_access,
                            }
                        }
                        FETCH(`${BASE_URL}/accounts/me/`, new_options).then((data) => {
                            actions({type: 'setState', payload: {...state, 
                                first_name: data.first_name,
                                last_name: data.last_name,
                                email: data.email,
                                phone_number: data.phone_number,
                                is_courier: data.courier !== null ? true : false,
                                courier_mode_on: false
                            }})
                            // navigate to the app
                            navigation.navigate("DrawerNavigation")
                        })
                    } else {
                        actions({type: 'setState', payload: {...state, 
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            phone_number: data.phone_number,
                            is_courier: data.courier !== null ? true : false,
                            courier_mode_on: false
                        }})
                        // navigate to the app
                        navigation.navigate("DrawerNavigation")
                    }
                })
            } else {
                navigation.navigate("Auth");
            }
        })
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon 
                    name='truck-delivery-outline'
                    color={'#fff'}
                    size={200}
                    style={{marginTop: 20}}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Najrýchlejšie doručenie!</Text>
                <Text style={styles.text}>Teraz už aj vo vašom meste.</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleEnterAppButton}>
                        <Text style={styles.textSign}>Vstúpiť</Text>
                        <MaterialIcons name="navigate-next" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSecond}>
                    <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate("Auth", {screen: "CheckOrderStatusScreen"})}>
                        <Text style={styles.textSign}>Stav zásielky</Text>
                        <MaterialIcons name="navigate-next" color="#fff" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393485'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingBottom: 50,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    buttonSecond: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    signIn: {
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: '#393485'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});