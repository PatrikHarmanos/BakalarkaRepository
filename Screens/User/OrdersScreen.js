import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { FETCH } from '../../Helpers/FetchHelper'
import { BASE_URL } from '../../cofig';

const OrdersScreen = ({route, navigation}) => {

  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  Moment.locale('en');
  const [isFetching, setIsFetching] = useState(false);
  const isFocused = useIsFocused();

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
  }

  useEffect(() => {
    SecureStore.getItemAsync('access').then((token) => {
      if (token != null) {
        setToken(token)
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        }
        FETCH(`${BASE_URL}/deliveries/`, options).then((data) => {
          if (data.message === 'logout_user') {
            navigation.navigate("Auth");
          } else if (data.message === 'new_token') {
            const new_options = {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + data.new_access,
              }
            }
            FETCH(`${BASE_URL}/deliveries/`, new_options).then((data) => {
              setData(data);
              setIsFetching(false); 
            })
          } else {
            setData(data);
            setIsFetching(false); 
          }
        })
      } else {
        navigation.navigate("Auth");
      }
    })
  }, [isFetching, isFocused])

  const onRefresh = () => {
    setIsFetching(true);
  }
  
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
            onRefresh={() => onRefresh()}
            refreshing={isFetching}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", {value: item, token: token})} style={styles.item}> 
                <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                  <Text style={{ color: '#e8a438', fontSize: 12, fontWeight: 'bold', marginBottom: 2}}>
                    { Moment(item.created_at).format('DD.MM.YYYY') }
                  </Text>
                  {item.state === 'ready' || item.state === 'assigned' || item.state === 'delivering' ? (
                      <Text style={{fontSize: 12, fontWeight: 'bold', marginBottom: 2, color: 'green'}}>Aktívna</Text>
                    ) : (<Text> </Text>)}
                </View>
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