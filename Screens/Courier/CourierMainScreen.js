import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";

import {
  Text
} from "react-native-paper";

import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from '@react-navigation/native';
import { FETCH } from '../../Helpers/FetchHelper';
import { BASE_URL, GOOGLE_KEY, GOOGLE_PLACES_URL } from "../../cofig";

const CourierMainScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getDeliveries().then(() =>  setIsFetching(false))
  }, [isFetching, isFocused]);

  const onRefresh = () => {
    setIsFetching(true);
  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return;
    }
    let location = await Location.getCurrentPositionAsync({})
    return location
  }

  const getDeliveries = async () => {
    try {
      getCurrentLocation().then(async (location) => {
        await SecureStore.getItemAsync("access").then((token) => {
          if (token != null) {
            const options = {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            }

            FETCH(`${BASE_URL}/couriers/closest_deliveries/?lon=${location["coords"]["longitude"]}&lat=${location["coords"]["latitude"]}`, options).then((data) => {
              console.log(data)
              if (data.message === 'logout_user') {
                navigation.navigate("Auth");
              } else if (data.message === 'new_token') {
                const new_options = {
                  method: 'GET',
                  headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + data.new_access
                  }
                }
                FETCH(`${BASE_URL}/couriers/closest_deliveries/?lon=${location["coords"]["longitude"]}&lat=${location["coords"]["latitude"]}`, new_options).then((data) => {
                  setData(data);
                })
              } else {
                setData(data);
              }
            })
          } else {
            navigation.navigate("Auth");
          }
        });
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleButton = async (index) => {
    let p, p1, p2, d, d1, d2
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

    Promise.all([
      // call google places API to get latitude and longtitude from place_id for pickup place
      FETCH(`${GOOGLE_PLACES_URL}?placeid=${data[index]["pickup_place"]["place_id"]}&key=${GOOGLE_KEY}`, options).then((data) => {
        for (
          let i = 0;
          i < data.result.address_components.length;
          i++
        ) {
          if (
            data.result.address_components[i].types[0] == "postal_code"
          ) {
            p = data.result.address_components[i].short_name
            break
          }
        }

        p1 = data.result.geometry.location.lat;
        p2 = data.result.geometry.location.lng;
      }),
      FETCH(`${GOOGLE_PLACES_URL}?placeid=${data[index]["delivery_place"]["place_id"]}&key=${GOOGLE_KEY}`, options).then((data) => {
        // get postal code from json response
        // it has to be done in thge loop, because the number of elements in the array can be different due to address number (sometimes there is no address number)
        for (
          let i = 0;
          i < data.result.address_components.length;
          i++
        ) {
          if (
            data.result.address_components[i].types[0] == "postal_code"
          ) {
            d = data.result.address_components[i].short_name
          }
        }
  
        // get lat and long from json response
        d1 = data.result.geometry.location.lat;
        d2 = data.result.geometry.location.lng;
      })
    ]).then(() => {
      navigation.navigate("CourierDeliveryScreen", {
        itemName: data[index]["item"]["name"],
        itemDescription: data[index]["item"]["description"],
        itemPhoto: data[index]["item"]["photo"],
        itemSize: data[index]["item"]["size"],
        itemWeight: data[index]["item"]["weight"],
        itemIsFragile: data[index]["item"]["fragile"],
        pickupPlaceLat: p1,
        pickupPlaceLong: p2,
        pickupPlacePostalCode: p,
        pickupPlaceCountry: data[index]["pickup_place"]["country"],
        pickupPlaceCity: data[index]["pickup_place"]["city"],
        pickupPlaceStreetAddress: data[index]["pickup_place"]["street_address"],
        pickupID: data[index]["pickup_place"]["place_id"],
        pickupPlaceDescription: data[index]["pickup_place"]["formatted_address"],
        deliveryPlaceLat: d1,
        deliveryPlaceLong: d2,
        deliveryPlacePostalCode: d,
        deliveryPlaceCountry: data[index]["delivery_place"]["country"],
        deliveryPlaceCity: data[index]["delivery_place"]["city"],
        deliveryPlaceStreetAddress:
          data[index]["delivery_place"]["street_address"],
        deliveryID: data[index]["delivery_place"]["place_id"],
        deliveryPlaceDescription:
          data[index]["delivery_place"]["formatted_address"],
        safeID: data[index]["safe_id"],
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Aktívne zásielky</Text>
      { isLoading ? <ActivityIndicator/> : (
        <View>
          { data.length === 0 ? 
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.noData}>
                Žiadne zásielky na doručenie
              </Text>
            </View> : (
            <FlatList
            data={data}
            keyExtractor={(item) => item.safe_id}
            onRefresh={() => onRefresh()}
            refreshing={isFetching}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleButton(index)}
                style={styles.item}
              >
                <Text style={{ color: '#e8a438', fontSize: 14, fontWeight: 'bold', marginBottom: 2}}>
                  { item.item.name }
                </Text>
                <Text style={styles.orderTitle}>
                  {item.pickup_place.formatted_address}
                </Text>
                <Text style={styles.orderSubTitle}>
                  {item.delivery_place.formatted_address}
                </Text>
              </TouchableOpacity>
            )}
          />
          )}
        </View>
      )}
    </View>
  );
};
export default CourierMainScreen;

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
