import React, {useState, useEffect} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';

const OrdersScreen = ({route, navigation}) => {

  const [data, setData] = useState([]);
  // const update = route.params;
  const [update, setUpdate] = useState(false);
  Moment.locale('en');

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    console.log(update)
    setUpdate(false)
    try {
      SecureStore.getItemAsync('access').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/core/my_deliveries/', {
                  method: "GET",
                  headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                  },
              })
              .then((response) => response.json())
              .then ((responseJson) => {
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
  }, [update])
  
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Odoslané zásielky</Text>
      { data.length === 0 ? 
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.noData}>
            Žiadne odoslané zásielky
          </Text>
        </View> : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", {value: item})} style={styles.item}> 
                <Text style={{ color: '#e8a438', fontSize: 12, fontWeight: 'bold', marginBottom: 2}}>
                  { Moment(item.created_at).format('DD.MM.YYYY') }
                </Text>
                <Text style={styles.orderTitle}>
                  {item.receiver.first_name} {item.receiver.last_name}
                </Text>
                <Text style={styles.orderSubTitle}>
                  {item.delivery_place.formatted_address}
                </Text>
              </TouchableOpacity>
            }
          /> )}
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
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#000'
      },
      item: {
        backgroundColor: '#fff',
        padding: 15,  
        marginVertical: 8,
        marginHorizontal: 8,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
      },
      orderTitle: {
        fontSize: 21,
        marginBottom: 4,
        color: '#000',
        fontWeight: 'bold'
      },
      orderSubTitle: {
        fontSize: 16,
        color: '#393485',
        fontWeight: 'bold'
      },
      noData: {
        fontSize: 14,
        color: '#777',
        marginTop: 10
      }
});