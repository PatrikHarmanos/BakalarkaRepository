import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import newOrderScreen from './NewOrderScreen';
import EditProfileScreen from './EditProfileScreen';
import NewOrderScreen from './NewOrderScreen';
import OrdersScreen from './OrdersScreen';
import NewOrderDetailsScreen from './NewOrderDetailsScreen';
import NewOrderItemScreen from './NewOrderItemScreen';
import OrderDetailsScreen from './OrderDetailsScreen';
import OrderCheckoutScreen from './OrderCheckoutScreen';
import PaymentInformationScreen from './PaymentInformationScreen';

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
              title: "Zadat platobne udaje"
            }}
            component={PaymentInformationScreen}
          />
  </Stack.Navigator>
  );

const newOrderScreenStack = ({navigation}) => (
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
            component={newOrderScreen}
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
              title: "Položka"
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
        component={newOrderScreenStack}
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