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
          title:'Domov',
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
            title: 'Moj profil',
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
              title: "Editovat profil"
            }}
            component={EditProfileScreen}
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
          <Stack.Screen name="Zásielky" component={newOrderScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </Stack.Navigator>
  );


const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: '#0075db' }}
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