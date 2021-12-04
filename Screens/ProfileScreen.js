import React from 'react';
import {
    View, 
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    SafeAreaView
} from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation
} from 'react-native-paper';

import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileScreen = ({navigation}) => {

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    setEmail(await AsyncStorage.getItem('@email'));
    setFirstName(await AsyncStorage.getItem('@first_name'));
    setLastName(await AsyncStorage.getItem('@last_name'));
    setPhoneNumber(await AsyncStorage.getItem('@phone_number'));
  }

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>

        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 25}}>
          <Avatar
            containerStyle={{backgroundColor: '#393485'}}
            size="large"
            rounded
            title={firstName + lastName}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>{firstName} {lastName}</Title>
              <Caption style={styles.caption}>@dsdasdasdsa</Caption>
            </View>
          </View>
        </View> 

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="home-outline" color="#777777" size={20} />
            <Text style={{color:"#777777", marginLeft: 20}} >Snina, Slovensko</Text>
          </View>
          <View style={styles.row}>
            <Icon name="chatbubbles-outline" color="#777777" size={20} />
            <Text style={{color:"#777777", marginLeft: 20}} >{email}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="call" color="#777777" size={20} />
            <Text style={{color:"#777777", marginLeft: 20}} >{phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>$120</Title>
              <Caption>Wallet</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>$120</Title>
              <Caption>Wallet</Caption>
            </View>
        </View> 

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => navigation.navigate('Order')}>
              <View style={styles.menuItem}>
                <Icon name="document-outline" size={25} color="#393485" />
                <Text style={styles.menuItemText}>Historia zasielok</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate("PaymentInformation")}>
              <View style={styles.menuItem}>
                <Icon name="document-outline" size={25} color="#393485" />
                <Text style={styles.menuItemText}>Platobne udaje</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate('settingsScreenStack')}>
              <View style={styles.menuItem}>
                <Icon name="document-outline" size={25} color="#393485" />
                <Text style={styles.menuItemText}>Nastavenia</Text>
              </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold'
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500'
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    menuWrapper: {
      marginTop: 10
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26
    }
});