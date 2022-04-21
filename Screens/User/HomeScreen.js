import React, { useContext, useState, useEffect } from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Context from '../../store/context';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation, route }) => {
  
  const {state, actions} = useContext(Context);

  const goToCourierApp = () => {
    if (state.is_courier) {
      navigation.navigate('CourierScreenStack', {screen: 'CourierMainScreen'})
      actions({type: 'setState', payload: {...state, 
        courier_mode_on: true
      }});
    }
    else {
      navigation.navigate('CourierScreenStack')
    }
  }
  
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card style={styles.item}>
            <Card.Cover source={require('../../images/becomeACourier.jpg')} />
            <Card.Content>
              <Title style={styles.cardTitle}>Staň sa aj ty kuriérom!</Title>
              <Paragraph style={styles.cardSubtitle}>Poď medzi nás a objav všetky výhody.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <View style={styles.button}>
                <TouchableOpacity onPress={goToCourierApp} style={styles.signIn}>
                    <Text style={styles.textSign}>Preskúmať</Text>
                </TouchableOpacity>
              </View>
            </Card.Actions>
          </Card>

          <View style={styles.createOrderCard}>
          <Text style={styles.createOrderCardText}>Vitajte, { state.first_name }</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate('Order')}} style={styles.signIn}>
                    <Text style={styles.textSign}>Poslať zásielku</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.timeline}>
            <Text style={styles.timelineHeading}>Ako poslať zásielku?</Text>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>1.</Text>
                <Text style={styles.timelineItemText}>Vytvoriť novú zásielku.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>2.</Text>
                <Text style={styles.timelineItemText}>Zadať adresu vyzdvihnutia a doručenia.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>3.</Text>
                <Text style={styles.timelineItemText}>Zadať údaje o zásielke a prijímateľovi.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>4.</Text>
                <Text style={styles.timelineItemText}>Potvrdiť zásielku.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>5.</Text>
                <Text style={styles.timelineItemText}>Počkať na potvrdenie kuriérom.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>6.</Text>
                <Text style={styles.timelineItemText}>Sledovať stav zásielky.</Text>
              </View>
              <Icon name="arrow-down" size={25} color="#393485" />
            </View>
            <View style={styles.timelineItem}>
              <View style={styles.timelineItemInner}>
                <Text style={styles.timelineItemHeading}>7.</Text>
                <Text style={styles.timelineItemText}>Zásielka je úspešne doručená!</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
    },
    timeline: {
      marginVertical: 8,
      marginHorizontal: 16
    },
    timelineHeading: {
      color: '#393485',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    timelineItem: {
      marginTop: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    timelineItemInner: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 3,
      borderRadius: 10,
      backgroundColor: '#f7f7f7',
      padding: 14,
      borderColor: '#e8a438',
      borderWidth: 1
    },
    timelineItemHeading: {
      color: '#e8a438',
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10
    },
    timelineItemText: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'bold'
    }
});