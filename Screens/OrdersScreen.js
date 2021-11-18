import React, {useState, useEffect} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const OrdersScreen = ({navigation}) => {

  const [data, setData] = useState();

  useEffect(() => {
    try {
      AsyncStorage.getItem('@access_token').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/core/my_deliveries/', {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              })
              .then((response) => response.json())
              .then ((responseJson) => {
                  console.log(responseJson);
                  setData(responseJson);
              })
              .catch((error) => {
                  console.log(error);
              });
          } else {
              // call refresh token
              return;
          }
      })
    } catch(error) {
        console.log(error);
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Odoslane zasielky</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", {value: item})} style={styles.item}> 
            <Text style={styles.orderTitle}>
              {item.receiver.first_name} {item.receiver.last_name}
            </Text>
            <Text style={styles.orderSubTitle}>
              {item.delivery_place.formatted_address}
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default OrdersScreen;

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