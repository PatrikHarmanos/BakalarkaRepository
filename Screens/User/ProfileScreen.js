import React, { useContext } from 'react';
import {
    View, 
    StyleSheet,
    SafeAreaView
} from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import Context from '../../store/context';

const ProfileScreen = ({navigation}) => {
  
  const {state} = useContext(Context)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
      <View>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 25}}>
          <Avatar
            containerStyle={{backgroundColor: '#393485'}}
            size="large"
            rounded
            title={state.first_name.charAt(0) + state.last_name.charAt(0)}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {marginTop: 15, marginBottom: 5}]}>{state.first_name} {state.last_name}</Title>
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
            <Text style={{color:"#777777", marginLeft: 20, fontWeight: 'bold'}} >{state.email}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="call" color="#777777" size={20} />
            <Text style={{color:"#777777", marginLeft: 20, fontWeight: 'bold'}} >{state.phone_number}</Text>
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