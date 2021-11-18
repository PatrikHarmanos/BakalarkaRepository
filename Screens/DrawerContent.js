import React from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props) {

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [isCourier, setIsCourier] = React.useState(true);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        // If the switch turns on -> go to main courier part of the application
        if (!isSwitchOn){
            props.navigation.navigate("courierScreenStack", {screen: 'CourierMainScreen'});
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
            label="Stat sa kurierom"
            onPress={() => {props.navigation.navigate("courierScreenStack")}}
        />
    ) : null;

    // function for log out, we need to delete access token
    // !!! also delete refresh token
    const deleteToken = async () => {
        try {
          await AsyncStorage.setItem('@access_token', '');
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
                                <Title style={styles.title}>Janko Hrbaty</Title>
                                <Caption style={styles.caption}>@j_hrbaty</Caption>
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