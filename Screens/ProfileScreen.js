import React from 'react';
import {
    View, 
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    SafeAreaView,
    ActivityIndicator
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
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    getUserInfo();
  }, [])

  const getUserInfo = async () => {
    try {
      setEmail(await AsyncStorage.getItem('@email'));
      setFirstName(await AsyncStorage.getItem('@first_name'));
      setLastName(await AsyncStorage.getItem('@last_name'));
      setPhoneNumber(await AsyncStorage.getItem('@phone_number'));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
        { isLoading ? <ActivityIndicator/> : (
          <View>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 25}}>
              <Avatar
                containerStyle={{backgroundColor: '#393485'}}
                size="large"
                rounded
                title={firstName.charAt(0) + lastName.charAt(0)}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
                <View style={{marginLeft: 20}}>
                  <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>{firstName} {lastName}</Title>
                  <Caption style={styles.caption}>@ax134kj7a</Caption>
                </View>
              </View>
            </View> 

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="home-outline" color="#777777" size={20} />
                <Text style={{color:"#777777", marginLeft: 20, fontWeight: 'bold'}} >Snina, Slovensko</Text>
              </View>
              <View style={styles.row}>
                <Icon name="chatbubbles-outline" color="#777777" size={20} />
                <Text style={{color:"#777777", marginLeft: 20, fontWeight: 'bold'}} >{email}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="call" color="#777777" size={20} />
                <Text style={{color:"#777777", marginLeft: 20, fontWeight: 'bold'}} >{phoneNumber}</Text>
              </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={styles.infoBox}>
                  <Title>0.00 €</Title>
                  <Caption style={{ fontWeight: 'bold' }}>Kredit</Caption>
                </View>
            </View> 

            <View style={styles.menuWrapper}>
              <TouchableRipple onPress={() => navigation.navigate('Order')}>
                  <View style={styles.menuItem}>
                    <Icon name="md-archive-sharp" size={25} color="#393485" />
                    <Text style={styles.menuItemText}>Moje zásielky</Text>
                  </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => navigation.navigate("PaymentInformation")}>
                  <View style={styles.menuItem}>
                    <Icon name="md-logo-usd" size={25} color="#393485" />
                    <Text style={styles.menuItemText}>Platobné údaje</Text>
                  </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => navigation.navigate('SettingsScreenStack')}>
                  <View style={styles.menuItem}>
                    <Icon name="md-construct" size={25} color="#393485" />
                    <Text style={styles.menuItemText}>Nastavenia</Text>
                  </View>
              </TouchableRipple>
            </View>
          </View>
        )}
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
      width: '100%',
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