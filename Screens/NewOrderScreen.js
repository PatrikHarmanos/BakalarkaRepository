import React, {useState, useEffect} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

const NewOrderScreen = ({navigation}) => {

  const [pickupData, setPickupData] = useState('');
  const [deliveryData, setDeliveryData] = useState('');

  const handleButton = () => {
    if (!pickupData){
      alert("Prosím vyberte miesto vyzdvihnutia");
      return;
    }

    if (!deliveryData) {
      alert("Prosím vyberte miesto doručenia");
      return;
    }

    navigation.navigate('NewOrderDetails', {pickup_place: pickupData, delivery_place: deliveryData})
  };

    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={[styles.text_header, {marginTop: 20}]}>Odkiaľ</Text>
              <View style={styles.action}>
                <GooglePlacesAutocomplete
                  placeholder='Vyhľadajte miesto vyzdvihnutia'
                  onPress={(data, details = null) => {
                    setPickupData(data);
                    console.log(data);
                  }}
                  query={{
                    key: 'AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY',
                    language: 'en',
                    components: 'country:sk',
                  }}
                />
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>Kde</Text>
              <View style={styles.action}>
                <GooglePlacesAutocomplete
                  placeholder='Vyhľadajte miesto doručenia'
                  onPress={(data, details = null) => {
                    setDeliveryData(data);
                    console.log(data);
                  }}
                  query={{
                    key: 'AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY',
                    language: 'en',
                    components: 'country:sk',
                  }}
                />
              </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
              <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
                  <Text style={styles.textSign}>Pokračovať</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

export default NewOrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      header: {
        flex: 4,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 30
      },
      footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 50
      },
      text_header: {
        color: '#05375a',
        fontSize: 18
      },
      action: {
        flexDirection: 'row',
        marginTop: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
      },
      textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#05375a'
      },
      button: {
        alignItems: 'center',
        marginTop: 100
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
      }
});