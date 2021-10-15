import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';

import TabScreen from './TabScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import { DrawerContent } from './DrawerContent';

const settingsScreenStack = ({navigation}) => (
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
            <Stack.Screen name="Nastavenia" component={SettingsScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </Stack.Navigator>
    );



const DrawerNavigation = (props) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="TabScreen" component={TabScreen} 
                options={{
                    title: 'Domov',
                    headerShown: false,
                }}/>
            <Drawer.Screen name="settingsScreenStack" component={settingsScreenStack} 
                options={{
                    title: 'Nastavenia',
                    headerShown: false,
                }}/>
            
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;