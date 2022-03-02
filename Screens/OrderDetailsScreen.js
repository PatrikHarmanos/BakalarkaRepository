import React, { useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';

const OrderDetailsScreen = ({ route, navigation }) => {
  
  const { value } = route.params;
  Moment.locale('en');

  let s = '';
  
  if (value.state == 'ready') {
    s = 'Zásielka čaká na priradenie kuriérovi';
  } else if (value.state == 'assigned') {
    s = 'Zásielka bola priradená kuriérovi';
  } else if (value.state == 'delivering') {
    s = 'Zásielka sa doručuje';
  } else {
    s = 'Zásielka bola doručená';
  }

  const callCourier = (number) => {
    
  }
 
  const courierInfo = value.courier ? (
        <View style={[styles.courierInfoBox, {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
            <Avatar.Image 
                source={require('../images/courier_avatar.png')}
                size={50}
            />
            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Kuriér</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#393485'}}>{ value.courier.person.first_name }</Text>
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',}}>
            <TouchableOpacity onPress={() => callCourier(value.courier.person.phone_number)}>
              <MaterialComunityIcons name="phone" size={30} style={{marginLeft: 50}}/> 
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialComunityIcons name="message-processing" size={30} style={{marginLeft: 15}}/> 
            </TouchableOpacity>
          </View>
        </View>
    ) : (<View style={[styles.courierInfoBox, {display: 'flex', flexDirection: 'row', alignItems: 'center'}]}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#393485'}}>Kuriér ešte nebol pridelený</Text>
        </View>);

  return (
      <View style={styles.container}>
        <ScrollView>
          
        <View style={styles.mainInfoBox}>
          <Text style={styles.mainInfoBoxTextDescription}>Odosielateľ</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.sender.first_name} {value.sender.last_name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.pickup_place.formatted_address}</Text>
          <Text style={[styles.mainInfoBoxTextDescription]}>Prijímateľ</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.receiver.first_name} {value.receiver.last_name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.delivery_place.formatted_address}</Text>
          <Text style={styles.mainInfoBoxTextDescription}>Položka</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.item.name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.item.description}</Text>
          <Text style={styles.mainInfoBoxTextDescription}>Dátum a čas odoslania</Text>
          <Text style={styles.mainInfoBoxTextMain}>{ Moment(value.created_at).format('DD.MM.YYYY') }</Text>
          <Text style={styles.mainInfoBoxTextSecond}>{ Moment(value.created_at).format('hh:mm:ss') }</Text>
        </View>

        <View style={[styles.deliveryStatus, {display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
          <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold'}}>Stav: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green'}}>{ s }</Text>
        </View>

        {courierInfo}

        <View style={styles.mainItemBox}>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Typ zásielky: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#393485' }}>{value.item.name}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Popis: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#393485' }}>{value.item.description}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Veľkosť: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#393485' }}>{value.item.size}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 5}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Hmotnosť: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#393485' }}>{value.item.weight}</Text>
          </View>
        </View>
        </ScrollView>
      </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
    mainText: {
      fontSize: 20,
    },
    mainInfoBox: {
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingBottom: 20,
      marginHorizontal: 8,
      marginTop: 10,
      borderRadius: 10,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1
    },
    mainItemBox: {
      backgroundColor: '#fff',
      padding: 10,  
      marginHorizontal: 16,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1
    },
    mainInfoBoxTextDescription: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold'
    },
    mainInfoBoxTextMain: {
      color: '#393485',
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 8,
      marginBottom: 2
    },
    mainInfoBoxTextSecond: {
      color: '#e8a438',
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 10
    },
    courierInfoBox: {
      backgroundColor: '#ddd',
      padding: 20,  
      marginVertical: 12,
      marginHorizontal: 16,
      borderRadius: 8
    }, 
    deliveryStatus: {
      backgroundColor: '#fff',
      padding: 20,  
      marginHorizontal: 8,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1
    }
});