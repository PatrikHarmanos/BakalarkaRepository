import React from 'react';
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

const OrderDetailsScreen = ({route, navigation}) => {

  const {value} = route.params;

  return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.mainInfoBox}>
          <Text style={styles.mainInfoBoxTextDescription}>Od</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.sender.first_name} {value.sender.last_name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.pickup_place.formatted_address}</Text>
          <Text style={[styles.mainInfoBoxTextDescription]}>Komu</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.receiver.first_name} {value.receiver.last_name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.delivery_place.formatted_address}</Text>
          <Text style={styles.mainInfoBoxTextDescription}>Obsah</Text>
          <Text style={styles.mainInfoBoxTextMain}>{value.item.name}</Text>
          <Text style={[styles.mainInfoBoxTextSecond, {marginBottom: 8}]}>{value.item.description}</Text>
          <Text style={styles.mainInfoBoxTextDescription}>Dátum a čas doručenia</Text>
          <Text style={styles.mainInfoBoxTextMain}>21.10.2021</Text>
          <Text style={styles.mainInfoBoxTextSecond}>11:35</Text>
        </View>

        <View style={[styles.courierInfoBox, {display: 'flex', flexDirection: 'row', alignItems: 'center'}]}>
          <Avatar.Image 
              source={require('../images/courier_avatar.png')}
              size={50}
          />
          <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 20}}>
            <Text style={{fontSize: 14}}>Váš kuriér</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Peter Jahoda</Text>
          </View>
          <MaterialComunityIcons name="phone" size={30} style={{marginLeft: 50}}/> 
          <MaterialComunityIcons name="message-processing" size={30} style={{marginLeft: 15}}/> 
        </View>

        <View style={styles.deliveryStatus}>
          <Text>Stav zasielky</Text>
        </View>

        
        
        
        <Text>{value.item.size}</Text>
        <Text>{value.item.weight}</Text>
        <Text>{value.item.fragile}</Text>
        <Text style={styles.mainText}>Odosielatel</Text>
        
        <Text>{value.sender.email}</Text>
        <Text>{value.sender.phone_number}</Text>
        
        <Text style={styles.mainText}>Prijimatel</Text>
        
        <Text>{value.receiver.email}</Text>
        <Text>{value.receiver.phone_number}</Text>
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
      backgroundColor: '#393485',
      padding: 20,  
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    mainInfoBoxTextDescription: {
      fontSize: 18,
      color: '#cdc8de'
    },
    mainInfoBoxTextMain: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      marginLeft: 20,
      marginTop: 8,
      marginBottom: 2
    },
    mainInfoBoxTextSecond: {
      color: '#e8a438',
      fontSize: 15,
      fontWeight: 'bold',
      marginLeft: 20
    },
    courierInfoBox: {
      backgroundColor: '#f2f2f0',
      padding: 20,  
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    }, 
    deliveryStatus: {
      backgroundColor: '#f2f2f0',
      padding: 20,  
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    }
});