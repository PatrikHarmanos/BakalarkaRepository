import React from 'react';
import {
    View, 
    Text,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default class OrdersScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      await AsyncStorage.getItem('@access_token').then((token) => {
          console.log(token);
          if (token != null) {
              fetch('http://147.175.150.96/api/core/my_deliveries/', {
                  method: "GET",
                  headers: {
                      'Authorization': 'Bearer ' + token,
                  },
              })
              .then((response) => response.json())
              .then ((responseJson) => {
                  console.log(responseJson);
                  this.setState({ data: responseJson });
              })
              .catch((error) => {
                  console.log(error);
              });
          } else {
              // call refresh token
              return;
          }
      })
    } catch(error) {
        console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeading}>Odoslane zasielky</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderDetails", {value: item})} style={styles.item}> 
              <Text style={styles.orderTitle}>
                {item.receiver.first_name} {item.receiver.last_name}
              </Text>
              <Text style={styles.orderSubTitle}>
                {item.delivery_place.formatted_address}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
      },
      textHeading: {
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10,
        color: '#777777'
      },
      item: {
        backgroundColor: '#dddddd',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 18
      },
      orderTitle: {
        fontSize: 18,
        marginBottom: 4
      },
      orderSubTitle: {
        fontSize: 14,
        color: '#777777'
      }
});