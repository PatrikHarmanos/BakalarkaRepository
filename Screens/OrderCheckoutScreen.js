import React, {useState, useRef} from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    KeyboardAvoidingView,
    TextInput,
    TouchableHighlight
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getPreciseDistance } from 'geolib';

const OrderCheckoutScreen = () => {
    const [state, setState] = useState({
        pickupCoordinates: {
            latitude: 48.982424,
            longitude: 22.151773,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922
        },
        dropLocationCoordinates: {
            latitude: 48.9325,
            longitude: 21.9079,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922
        }
    })

    const {pickupCoordinates, dropLocationCoordinates} = state

    const mapRef = useRef();

    const calculatePreciseDistance = () => {
        var pdis = getPreciseDistance(
          { latitude: pickupCoordinates.latitude, longitude: pickupCoordinates.longitude },
          { latitude: dropLocationCoordinates.latitude, longitude: dropLocationCoordinates.longitude }
        );
        alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
      };
        
    return (
        <View style={styles.container}>
            <MapView
            ref={mapRef}
            style={styles.container}
            initialRegion={pickupCoordinates}
            >
                <Marker 
                    coordinate={pickupCoordinates}
                />
                <Marker 
                    coordinate={dropLocationCoordinates}
                />
                <MapViewDirections
                    origin={pickupCoordinates}
                    destination={dropLocationCoordinates}
                    apikey={"AIzaSyD3IdOaoOc8tVpnakDzh1BLImcS-iJxoVY"}
                    strokeWidth={3}
                    strokeColor="red"
                    optimizeWaypoints={true}
                    onReady={ result => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: 30,
                                bottom: 300,
                                left: 30,
                                top: 100
                            }
                        })
                    }}
                />  
            </MapView>
            <View>
                <TouchableHighlight
                    onPress={calculatePreciseDistance}>
                    <Text>Get Precise Distance</Text>
                </TouchableHighlight>
            </View>
        </View>
    ); 
}

export default OrderCheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
      }
});