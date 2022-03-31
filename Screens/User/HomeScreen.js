import React, { useContext } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import Context from '../../store/context';

const HomeScreen = ({ navigation, route }) => {
  
  const {state} = useContext(Context);
    
    return (
      <View style={styles.container}>
          <Card style={styles.item}>
            <Card.Cover source={require('../../images/becomeACourier.jpg')} />
            <Card.Content>
              <Title style={styles.cardTitle}>Staň sa aj ty kuriérom!</Title>
              <Paragraph style={styles.cardSubtitle}>Poď medzi nás a objav všetky výhody.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <View style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate('CourierScreenStack')}} style={styles.signIn}>
                    <Text style={styles.textSign}>Preskúmať</Text>
                </TouchableOpacity>
              </View>
            </Card.Actions>
          </Card>

          <View style={styles.createOrderCard}>
          <Text style={styles.createOrderCardText}>Vitajte, { state.first_name }</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate('Order', {screen: 'NewOrder'})}} style={styles.signIn}>
                    <Text style={styles.textSign}>Poslať zásielku</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    item: {
      backgroundColor: '#f7f7f7',
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 18
    },
    cardTitle: {
      color: '#393485',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 12
    },
    cardSubtitle: {
      color: '#e8a438',
      fontWeight: 'bold',
      fontSize: 16
    }, 
    button: {
      alignItems: 'center',
      marginLeft: 8
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
      color: '#fff',
      paddingHorizontal: 15
    },
    createOrderCard: {
      backgroundColor: '#e8a438', 
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 18,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12
    },
    createOrderCardText: {
      fontSize: 22,
      color: '#fff',
      fontWeight: 'bold'
    }
});