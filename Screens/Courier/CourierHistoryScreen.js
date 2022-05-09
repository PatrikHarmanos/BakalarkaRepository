import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import {
  Text
} from "react-native-paper";

import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from '@react-navigation/native';
import { FETCH } from '../../Helpers/FetchHelper'
import { BASE_URL } from "../../cofig";
import Moment from 'moment';

const CourierHistoryScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);
  Moment.locale('en');

  useEffect(() => {
    getDeliveries().then(() =>  setIsFetching(false))
  }, [isFetching, isFocused]);

  const onRefresh = () => {
    setIsFetching(true);
  }

  const getDeliveries = async () => {
    await SecureStore.getItemAsync("access").then((token) => {
      if (token != null) {
        const options = {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }

        FETCH(`${BASE_URL}/deliveries/?courier=me`, options).then((data) => {
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
            FETCH(`${BASE_URL}/deliveries/?courier=me`, new_options).then((data) => {
              setData(data);
              setIsFetching(false); 
            })
          } else {
            setData(data);
            setIsFetching(false); 
          }
        })
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>História doručovania</Text>
      { isLoading ? <ActivityIndicator/> : (
        <View>
          { data.length === 0 ? 
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.noData}>
                Nedoručili ste žiadne zásielky
              </Text>
            </View> : (
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                onRefresh={() => onRefresh()}
                refreshing={isFetching}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{ color: '#e8a438', fontSize: 14, fontWeight: 'bold', marginBottom: 2}}>
                                { item.item.name }
                            </Text>
                            <Text style={{ color: '#e8a438', fontSize: 12, fontWeight: 'bold', marginBottom: 2}}>
                                { Moment(item.created_at).format('DD.MM.YYYY') }
                            </Text>
                        </View>
                        <Text style={styles.orderTitle}>
                            {item.pickup_place.formatted_address}
                        </Text>
                        <Text style={styles.orderSubTitle}>
                            {item.delivery_place.formatted_address}
                        </Text>
                    </View>
                )}
          />
          )}
        </View>
      )}
    </View>
  );
};
export default CourierHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textHeading: {
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
    color: "#000",
    fontWeight: 'bold'
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
    color: "#000",
    fontWeight: "bold",
  },
  orderSubTitle: {
    fontSize: 16,
    color: "#393485",
  },
  noData: {
    fontSize: 14,
    color: '#777',
    marginTop: 10
  }
});
