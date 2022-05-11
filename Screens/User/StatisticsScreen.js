import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import {
    BarChart
} from "react-native-chart-kit";
import { FETCH } from '../../Helpers/FetchHelper'
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from "../../cofig";
import { ActivityIndicator } from "react-native-paper";
import Moment from 'moment';

const StatisticsScreen = () => {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [chartData, setChartData] = useState();  
    Moment.locale('en');

    useEffect(() => {
        setIsFetching(true)
        SecureStore.getItemAsync('access').then((token) => {
          if (token != null) {
            const options = {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            }

            FETCH(`${BASE_URL}/deliveries/statistics/`, options).then((data) => {
              if (data.message === 'logout_user') {
                navigation.navigate("Auth");
              } else if (data.message === 'new_token') {
                const new_options = {
                  method: 'GET',
                  headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + data.new_access,
                  }
                }
                FETCH(`${BASE_URL}/deliveries/statistics/`, new_options).then((data) => {
                  let chart = {
                    labels: [],
                    datasets: [
                      {
                        data: []
                      }
                    ]
                  }
                  data.map((item) => {
                    chart.labels.push( Moment(item.month).format('MM.YY'))
                    chart.datasets[0].data.push(item.count)
                  })
                  setChartData(chart)
                  setIsFetching(false);
                })
              } else {
                let chart = {
                  labels: [],
                  datasets: [
                    {
                      data: []
                    }
                  ]
                }
                data.map((item) => {
                  chart.labels.push( Moment(item.month).format('MM.YY'))
                  chart.datasets[0].data.push(item.count)
                })
                setChartData(chart)
                setIsFetching(false);
              }
            })
          } else {
            navigation.navigate("Auth");
          }
        })
      }, [])

  return (
    <View style={styles.container}>
        { isFetching ? <ActivityIndicator/> : (
            <View>
              <Text style={styles.headingText}>Odoslané zásielky</Text>
              <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 32} // from react-native
                height={220}
                fromZero={true}
                chartConfig={{
                  backgroundGradientFrom: "#f7f7f7",
                  backgroundGradientTo: "#f7f7f7",
                  decimalPlaces: 0,
                  color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,  
                  },
                }}
                style={{
                  marginVertical: 8,
                  borderRadius: 20,
                  marginHorizontal: 16
                }}
              />
            </View>
        )}
    </View>
      
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 5
  }
});