import React, {useState} from 'react';
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

const NewOrderScreen = ({navigation}) => {

  const [pickupData, setPickupData] = useState('');
  const [deliveryData, setDeliveryData] = useState('');

    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={[styles.text_header, {marginTop: 20}]}>Odkial</Text>
              <View style={styles.action}>
                <GooglePlacesAutocomplete
                  placeholder='Vyhladajte miesto vyzdvihnutia'
                  onPress={(data, details = null) => {
                    setPickupData(data);
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
                  placeholder='Vyhladajte ciel'
                  onPress={(data, details = null) => {
                    setDeliveryData(data);
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
              <TouchableOpacity  style={styles.signIn} onPress={() => navigation.navigate('NewOrderDetails', {pickup_place: pickupData, delivery_place: deliveryData})}>
                  <Text style={styles.textSign}>Pokracovat</Text>
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
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2
      },
      footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        
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
        backgroundColor: '#0075db'
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
      }
});