import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

import HomeScreen from '../User/HomeScreen';
import ProfileScreen from '../User/ProfileScreen';
import EditProfileScreen from '../User/EditProfileScreen';
import NewOrderScreen from '../User/NewOrderScreen';
import OrdersScreen from '../User/OrdersScreen';
import NewOrderDetailsScreen from '../User/NewOrderDetailsScreen';
import NewOrderItemScreen from '../User/NewOrderItemScreen';
import OrderDetailsScreen from '../User/OrderDetailsScreen';
import OrderCheckoutScreen from '../User/OrderCheckoutScreen';
import PaymentInformationScreen from '../User/PaymentInformationScreen';
import StatisticsScreen from '../User/StatisticsScreen';
import WatchCourierScreen from '../User/WatchCourierScreen';

const HomeStackScreen = ({navigation}) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
    backgroundColor: '#fff',
    shadowColor: '#fff', // ios (header bottom line)
    elevation: 0 // android 
    },
    headerTitleStyle: {
    fontWeight: 'bold'
    }
}}>
          <Stack.Screen name="Domovv" component={HomeScreen} options={{
          title:'',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </Stack.Navigator>
  );

const ProfileStackScreen = ({navigation}) => (
  <Stack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff', // ios (header bottom line)
          elevation: 0 // android 
          },
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <Stack.Screen name="Môj profil" component={ProfileScreen} options={{
            title: 'Môj profil',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} color="#000" backgroundColor="#fff" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
            <MaterialComunityIcons.Button name="account-edit" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.navigate("EditProfile")}></MaterialComunityIcons.Button>
          )
          }} />

          <Stack.Screen 
            name="EditProfile"
            options= {{
              title: "Editovať profil"
            }}
            component={EditProfileScreen}
          />

          <Stack.Screen 
            name="PaymentInformation"
            options= {{
              title: "Platobné údaje"
            }}
            component={PaymentInformationScreen}
          />

          <Stack.Screen 
            name="StatisticsScreen"
            options= {{
              title: "Moje štatistiky"
            }}
            component={StatisticsScreen}
          />
  </Stack.Navigator>
  );

const NewOrderScreenStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
    backgroundColor: '#fff',
    shadowColor: '#fff', // ios (header bottom line)
    elevation: 0 // android 
    },
    headerTitleStyle: {
    fontWeight: 'bold'
    }
  }}>
          <Stack.Screen name="Orders" component={OrdersScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (
            <MaterialComunityIcons.Button name="plus" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.navigate("NewOrder")}></MaterialComunityIcons.Button>
          ),
          title: ""
          }} />
          <Stack.Screen 
            name="NewOrder"
            options= {{
              title: "Nová zásielka"
            }}
            component={NewOrderScreen}
          />
          <Stack.Screen 
            name="NewOrderDetails"
            options= {{
              title: "Príjemca"
            }}
            component={NewOrderDetailsScreen}
          />
          <Stack.Screen 
            name="NewOrderItem"
            options= {{
              title: "Zásielka"
            }}
            component={NewOrderItemScreen}
          />
          <Stack.Screen 
            name="OrderDetails"
            options= {{
              title: "Detail zásielky"
            }}
            component={OrderDetailsScreen}
          />
          <Stack.Screen 
            name="WatchCourier"
            options= {{
              title: "Pozícia kuriéra"
            }}
            component={WatchCourierScreen}
          />
          <Stack.Screen 
            name="OrderCheckout"
            options= {{
              title: "Detail zásielky"
            }}
            component={OrderCheckoutScreen}
          />
  </Stack.Navigator>
  );


const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: '#393485' }}
    >
      <Tab.Screen
        name="Domov"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Domov',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />

    <Tab.Screen
        name="Order"
        component={NewOrderScreenStack}
        options={{
          tabBarLabel: 'Zásielky',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-mail" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
);

export default TabScreen;