import React, { useState } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const NewOrderDetailsScreen = ({route, navigation}) => {
  const [receiverFirstName, setReceiverFirstName] = useState('');
  const [receiverLastName, setReceiverLastName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverNumber, setReceiverNumber] = useState('');

  const { pickup_place, delivery_place } = route.params;

  const handleButton = () => {

    if (!receiverFirstName) {
      alert('Prosím zadajte meno príjimateľa');
      return;
    }

    if (!receiverLastName) {
      alert('Prosím zadajte priezvisko príjimateľa');
      return;
    }

    if (!receiverNumber) {
      alert('Prosím zadajte telefónne číslo');
      return;
    }

    if (!receiverEmail) {
      alert('Prosím zadajte e-mail');
      return;
    }

    navigation.navigate('NewOrderItem', {
      FirstName: receiverFirstName,
      LastName: receiverLastName,
      Number: receiverNumber,
      Email: receiverEmail,
      pickup_place: pickup_place,
      delivery_place: delivery_place
    })
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ScrollView>
            <Text style={[styles.text_header, {marginTop: 20}]}>Meno príjemcu</Text>
            <View style={styles.action}>
              <TextInput style={styles.textInput} onChangeText={(FirstName) => setReceiverFirstName(FirstName)}
                  placeholder="Zadajte meno"
              /> 
            </View>
            <Text style={[styles.text_header, {marginTop: 20}]}>Priezvisko príjemcu</Text>
            <View style={styles.action}>
              <TextInput style={styles.textInput} onChangeText={(LastName) => setReceiverLastName(LastName)}
                  placeholder="Zadajte priezvisko"
              /> 
            </View>
            <Text style={[styles.text_header, {marginTop: 20}]}>E-mail</Text>
            <View style={styles.action}>
              <TextInput style={styles.textInput} onChangeText={(Email) => setReceiverEmail(Email)}
                  placeholder="Zadajte e-mail"
              /> 
            </View>
            <Text style={[styles.text_header, {marginTop: 20}]}>Telefónne číslo</Text>
            <View style={styles.action}>
              <TextInput style={styles.textInput} onChangeText={(Number) => setReceiverNumber(Number)}
                  placeholder="Zadajte telefónne číslo"
              /> 
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.button}>
            <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
                <Text style={styles.textSign}>Pokračovať</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

export default NewOrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      header: {
        flex: 4,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 30
      },
      footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        paddingBottom: 50
      },
      text_header: {
        color: '#05375a',
        fontSize: 18
      },
      action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
      },
      textInput: {
        flex: 1,
        marginBottom: 10,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15
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
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
      }
});