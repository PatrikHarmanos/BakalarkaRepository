import React, {useEffect, useState} from 'react';
import {
    View, 
    Button,
    StyleSheet,
    Dimensions,
    FlatList
  } from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation
} from 'react-native-paper';

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CourierMainScreen = ({route, navigation}) => {
    const [distance, setDistance] = useState();

    const {
        data,
        pickupPlacePostalCode,
        pickupPlaceLat,
        pickupPlaceLong,
        deliveryPlacePostalCode,
        deliveryPlaceLat,
        deliveryPlaceLong
    } = route.params;

    const handleButton = () => {
  
        navigation.navigate("CourierDeliveryScreen", {
        itemName: data[0]["item"]["name"],
          itemDescription: data[0]["item"]["description"],
          itemPhoto: data[0]["item"]["photo"],
          itemSize: data[0]["item"]["size"],
          itemWeight: data[0]["item"]["weight"],
          itemIsFragile: data[0]["item"]["fragile"],
          pickupPlaceLat: pickupPlaceLat,
          pickupPlaceLong: pickupPlaceLong,
          pickupPlacePostalCode: pickupPlacePostalCode,
          pickupPlaceCountry: data[0]["pickup_place"]["country"],
          pickupPlaceCity: data[0]["pickup_place"]["city"],
          pickupPlaceStreetAddress: data[0]["pickup_place"]["street_address"],
          pickupID: data[0]["pickup_place"]["place_id"],
          pickupPlaceDescription: data[0]["pickup_place"]["formatted_address"],
          deliveryPlaceLat: deliveryPlaceLat,
          deliveryPlaceLong: deliveryPlaceLong,
          deliveryPlacePostalCode: deliveryPlacePostalCode,
          deliveryPlaceCountry: data[0]["delivery_place"]["country"],
          deliveryPlaceCity: data[0]["delivery_place"]["city"],
          deliveryPlaceStreetAddress: data[0]["delivery_place"]["street_address"],
          deliveryID: data[0]["delivery_place"]["place_id"],
          deliveryPlaceDescription: data[0]["delivery_place"]["formatted_address"],
          safeID: data[0]["safe_id"]
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>Aktualne zasielky</Text>
            <FlatList
                data={data}
                keyExtractor={item => item.safe_id}
                renderItem={({ item }) => 
                    <TouchableOpacity style={styles.item} onPress={handleButton}> 
                        <Text style={styles.orderTitle}>
                            {item.pickup_place.formatted_address}
                        </Text>
                        <Text style={styles.orderSubTitle}>
                            dsadfasx
                        </Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );

};
export default CourierMainScreen;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      textHeading: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#777777'
      },
      item: {
        backgroundColor: '#393485',
        padding: 20,  
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 18
      },
      orderTitle: {
        fontSize: 21,
        marginBottom: 4,
        color: '#fff',
        fontWeight: 'bold'
      },
      orderSubTitle: {
        fontSize: 16,
        color: '#cdc8de'
      }
});