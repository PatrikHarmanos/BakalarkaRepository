import React, {useState} from 'react';
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

const NewOrderDetailsScreen = ({route, navigation}) => {
  const [receiverFirstName, setReceiverFirstName] = useState('');
  const [receiverLastName, setReceiverLastName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverNumber, setReceiverNumber] = useState('');

  const { pickup_place, delivery_place } = route.params;

  const handleButton = () => {

    // if (!receiverFirstName) {
    //   alert('Prosím zadajte meno');
    //   return;
    // }

    // if (!receiverLastName) {
    //   alert('Prosím zadajte priezvisko');
    //   return;
    // }

    // if (!receiverNumber) {
    //   alert('Prosím zadajte telefónne číslo');
    //   return;
    // }

    // if (!receiverEmail) {
    //   alert('Prosím zadajte e-mail');
    //   return;
    // }

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
            <KeyboardAvoidingView>
              <Text style={[styles.text_header, {marginTop: 20}]}>Meno prijemcu</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(FirstName) => setReceiverFirstName(FirstName)}
                    placeholder="Zadajte meno"
                /> 
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>Priezvisko prijemcu</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(LastName) => setReceiverLastName(LastName)}
                    placeholder="Zadajte priezvisko"
                /> 
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>E-mail prijemcu</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(Email) => setReceiverEmail(Email)}
                    placeholder="Zadajte e-mail"
                /> 
              </View>
              <Text style={[styles.text_header, {marginTop: 20}]}>Telefonne cislo prijemcu</Text>
              <View style={styles.action}>
                <TextInput style={styles.textInput} onChangeText={(Number) => setReceiverNumber(Number)}
                    placeholder="Zadajte telefonne cislo"
                /> 
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.footer}>
            <View style={styles.button}>
              <TouchableOpacity  style={styles.signIn} onPress={handleButton}>
                  <Text style={styles.textSign}>Pokracovat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

export default NewOrderDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff'
      },
      header: {
        flex: 3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40,
        borderBottomColor: '#dddddd',
        borderBottomWidth: 2
      },
      footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
      },
      text_header: {
        color: '#05375a',
        fontSize: 18
      },
      action: {
        flexDirection: 'row',
        marginTop: 6,
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
        marginTop: 20
      },
      signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#0075db'
      },
      textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
      }
});