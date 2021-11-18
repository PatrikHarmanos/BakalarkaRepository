import React from 'react';
import {
    View, 
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    route,
    SafeAreaView
  } from 'react-native'; 

import {
  Title,
  Caption,
  Text,
  TouchableRipple,
  BottomNavigation
} from 'react-native-paper';

const BecomeACourierScreen = ({navigation}) => {

  const handleButton = () => {
    navigation.navigate("BecomeACourierMoreInfo");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>id front</Text>
        <Text>id back</Text>
        <Text>dl front</Text>
        <Text>dl back</Text>
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
export default BecomeACourierScreen;

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