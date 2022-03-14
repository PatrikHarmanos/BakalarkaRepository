import React, {useContext} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';

import Context from '../store/context';

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

const SplashScreen = ({navigation}) => {

    const {state, actions} = useContext(Context);

    const handleEnterAppButton = async () => {

        try {
            await SecureStore.getItemAsync('access').then((token) => {
                console.log(token);
                if (token != null) {
                    fetch('http://147.175.150.96/api/account/my_account/', {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token,
                        }
                    })
                    .then((response) => response.json())
                    .then ((responseJson) => {
                        actions({type: 'setState', payload: {...state, 
                            first_name: responseJson.person.first_name,
                            last_name: responseJson.person.last_name,
                            email: responseJson.email,
                            phone_number: responseJson.person.phone_number,
                            is_courier: responseJson.is_courier
                          }});
                        if (responseJson.code == "token_not_valid" || responseJson.code == "bad_authorization_header"){
                            navigation.navigate("Auth");
                        } else {
                            global.is_courier = responseJson.is_courier;
                            navigation.navigate("DrawerNavigation");
                        }
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
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image/>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Najrýchlejšie doručenie!</Text>
                <Text style={styles.text}>Teraz už aj vo vašom meste.</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={handleEnterAppButton}>
                        <Text style={styles.textSign}>Prihlásiť sa</Text>
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
        paddingVertical: 50,
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