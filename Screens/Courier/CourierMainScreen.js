import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Dimensions, FlatList, ActivityIndicator } from "react-native";

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation,
} from "react-native-paper";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from '@react-navigation/native';

const CourierMainScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [pickupPlacePostalCode, setPickupPlacePostalCode] = useState();
  const [pickupPlaceLat, setPickupPlaceLat] = useState();
  const [pickupPlaceLong, setPickupPlaceLong] = useState();
  const [deliveryPlacePostalCode, setDeliveryPlacePostalCode] = useState();
  const [deliveryPlaceLat, setDeliveryPlaceLat] = useState();
  const [deliveryPlaceLong, setDeliveryPlaceLong] = useState();

  const [currentLocationLat, setCurrentLocationLat] = useState();
  const [currentLocationLon, setCurrentLocationLon] = useState();

  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getDeliveries();
    setIsFetching(false);
  }, [isFetching, isFocused]);

  const onRefresh = () => {
    setIsFetching(true);
  }

  const getDeliveries = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({})
      setCurrentLocationLat(location["coords"]["latitude"]);
      setCurrentLocationLon(location["coords"]["longitude"]);

      await SecureStore.getItemAsync("access").then((token) => {
        if (token != null) {
          fetch(`http://147.175.150.96/api/couriers/closest_deliveries/?lon=${location["coords"]["longitude"]}&lat=${location["coords"]["latitude"]}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
            .then((response) => response.json())
            .then((responseJson) => {
              setData(responseJson);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          navigation.navigate("Auth");
        }
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleButton = async (index) => {
    let p, p1, p2, d, d1, d2

    // call google places API to get latitude and longtitude from place_id for pickup place
    await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data[index]["pickup_place"]["place_id"]}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        for (
          let i = 0;
          i < responseJson.result.address_components.length;
          i++
        ) {
          if (
            responseJson.result.address_components[i].types[0] == "postal_code"
          ) {
            p = responseJson.result.address_components[i].short_name
            break
          }
        }

        p1 = responseJson.result.geometry.location.lat;
        p2 = responseJson.result.geometry.location.lng;
      });

      await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data[index]["delivery_place"]["place_id"]}&key=AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // get postal code from json response
          // it has to be done in thge loop, because the number of elements in the array can be different due to address number (sometimes there is no address number)
          for (
            let i = 0;
            i < responseJson.result.address_components.length;
            i++
          ) {
            if (
              responseJson.result.address_components[i].types[0] == "postal_code"
            ) {
              d = responseJson.result.address_components[i].short_name
            }
          }
  
          // get lat and long from json response
          d1 = responseJson.result.geometry.location.lat;
          d2 = responseJson.result.geometry.location.lng;
        });
    
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
    });
  };

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
