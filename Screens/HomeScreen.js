import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';


const HomeScreen = ({navigation}) => {
    
    return (
        <View style={styles.container}>
            
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      button: {
        alignItems: 'center',
        marginTop: 0,
        borderColor: '#444'
      },
      signIn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: '#f7ab31'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
      header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
      },
      footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
      }
});