import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Auth/LoginScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import SplashScreen from './Screens/Auth/SplashScreen';
import DrawerNavigation from './Screens/Navigation/DrawerNavigation';
import CheckOrderStatusScreen from './Screens/User/CheckOrderStatusScreen';
import OrderDetailsScreen from './Screens/User/OrderDetailsScreen';



const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
      <Stack.Screen name="CheckOrderStatusScreen" component={CheckOrderStatusScreen} options={{headerShown: false}}/>
      <Stack.Screen 
            name="OrderDetails"
            options= {{
              title: "Order details"
            }}
            component={OrderDetailsScreen}
          />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Auth" 
        component={Auth}
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="DrawerNavigation" 
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;