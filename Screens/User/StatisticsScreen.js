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
import { callAPI, callRefreshToken } from '../../Helpers/FetchHelper'
import * as SecureStore from 'expo-secure-store';

const StatisticsScreen = () => {

    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [chartData, setChartData] = useState();  

    useEffect(() => {
        setIsFetching(true)
        try {
          SecureStore.getItemAsync('access').then((token) => {
            if (token != null) {
              callAPI(
                'http://147.175.150.96/api/deliveries/',
                'GET',
                {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },
              ).then ((data) => {
                if (data.code !== 'token_not_valid') {
                  console.log(data)
                  setData(data);
                  setChartData({
                    labels: ["January", "February", "march"],
                    datasets: [
                      {
                        data: [
                          2, 5, 15
                        ]
                      }
                    ]
                  })
                  setIsFetching(false);
                } else {
                  SecureStore.getItemAsync('refresh').then((refreshToken) => {
                    // if access token is invalid => call refresh token
                    callRefreshToken(refreshToken).then((data) => {
                      // save new access and refresh token
                      save('access', data.access)
                      save('refresh', data.refresh)
    
                      callAPI(
                        'http://147.175.150.96/api/deliveries/',
                        'GET',
                        {
                          'content-type': 'application/json',
                          'Authorization': 'Bearer ' + data.access,
                        },
                      ).then((data) => {
                        setData(data);
                        setIsFetching(false);
                      })
                    })
                  })
                }
              })
            } else {
              navigation.navigate("Auth");
            }
          })
        } catch(error) {
          console.log(error);
        }
      }, [])

  return (
    <View style={styles.container}>
        { isFetching ? <Text>d</Text> : (
            <View>
              <Text>Vaše štatistiky</Text>
              <Text>Odoslané zásielky</Text>
              <BarChart
                data={chartData}
                width={Dimensions.get("window").width - 32} // from react-native
                height={220}
                withInnerLines={true}
                fromZero={true}
                showBarTops={false}
                showValuesOnTopOfBars={true}
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
  }
});