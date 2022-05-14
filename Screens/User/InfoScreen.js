import React from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const InfoScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Táto aplikácia bola vyvinutá ako súčasť bakalárskej práce žiaka Patrik Harmaňoš v roku 2022 na Fakulte Informatiky a Informačných Technológii STU v Bratislave.</Text>
      </View>
    );
};

export default InfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 22
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold'
    }
});