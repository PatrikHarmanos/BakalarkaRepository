import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { FETCH } from '../../Helpers/FetchHelper'
import { BASE_URL } from "../../cofig";

const CheckOrderStatusScreen = ({navigation}) => {
  const [deliveryID, setDeliveryID] = useState('');
  const [data, setData] = useState();

  const handleSubmitButton = () => {

    if (!deliveryID) {
      alert('Prosím zadajte číslo zásielky');
      return;
    }

    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }

    FETCH(`${BASE_URL}/core/get_delivery/?id=${deliveryID}`, options).then((data) => {
      setData(data)
      navigation.navigate("OrderDetails", {value: data})
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Sledovat stav zasielky</Text>
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView>
          <Text style={[styles.text_footer, {marginTop: 5}]}>Cislo zasielky</Text>
          <View style={styles.action}>
            <TextInput style={styles.textInput}
                onChangeText={(deliveryID) => setDeliveryID(deliveryID)}
                placeholder="Zadajte cislo zasielky"
            /> 
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={handleSubmitButton} style={styles.signIn}>
                <Text style={styles.textSign}>Sledovat zasielku</Text>
            </TouchableOpacity>
          </View>
        
        </KeyboardAvoidingView>
             
      </View>
      
    </View>
  );
};
export default CheckOrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393485'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#393485'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});