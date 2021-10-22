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
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderDetailsScreen = ({route, navigation}) => {

  const {value} = route.params;

  return (
      <View style={styles.container}>
        <Text style={styles.mainText}>Zasielka</Text>
        <Text>{value.item.name}</Text>
        <Text>{value.item.description}</Text>
        <Text>{value.item.size}</Text>
        <Text>{value.item.weight}</Text>
        <Text>{value.item.fragile}</Text>
        <Text style={styles.mainText}>Odosielatel</Text>
        <Text>{value.sender.first_name} {value.sender.last_name}</Text>
        <Text>{value.sender.email}</Text>
        <Text>{value.sender.phone_number}</Text>
        <Text>{value.pickup_place.formatted_address}</Text>
        <Text style={styles.mainText}>Prijimatel</Text>
        <Text>{value.receiver.first_name} {value.receiver.last_name}</Text>
        <Text>{value.receiver.email}</Text>
        <Text>{value.receiver.phone_number}</Text>
        <Text>{value.delivery_place.formatted_address}</Text>
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
    }
});