import React, { useState, useRef, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const WatchCourierScreen = ({route, navigation}) => {

    const { token } = route.params;
    const mapRef = useRef();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    var ws = useRef(new WebSocket(`wss://poslito.com/ws/couriers/?token=${token}`)).current

    useEffect(async () => {
        let isMounted = true;  
        
        ws.onmessage = ({data}) => {
            if (isMounted) {
                let dataJson = JSON.parse(data)
                setLatitude(dataJson.latitude)
                setLongitude(dataJson.longitude)
            }
        }
        
        return () => { isMounted = false }; 
    })
    
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.container}
            >
                <Marker 
                    coordinate={{
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0922
                    }}
                >
                    <Image source={require('../../images/delivery-truck.png')} style={{height: 50, width: 50 }} />
                </Marker>
            </MapView>
        </View>
    ); 
}

export default WatchCourierScreen;

const styles = StyleSheet.create({
    container: {
        flex: 2
    },
    header: {
        flex: 3
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 50,
        paddingTop: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#393485'
    },
    rejectOrder: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#bd0909'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    footer_section: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    footer_section_value: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer_section_text: {
        fontSize: 15,
        color: '#777',
        marginBottom: 5
    }
});