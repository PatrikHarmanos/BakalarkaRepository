import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../User/SettingsScreen';
import TabScreen from './TabScreen';
import BecomeACourierScreen from '../Courier/BecomeACourierScreen';
import BecomeACourierMoreInfoScreen from '../Courier/BecomeACourierMoreInfoScreen';
import CourierMainScreen from '../Courier/CourierMainScreen';
import { DrawerContent } from '../Navigation/DrawerContent';
import CourierDeliveryScreen from '../Courier/CourierDeliveryScreen';
import CourierPickupDeliveryScreen from '../Courier/CourierPickupDeliveryScreen';
import CourierActiveDeliveryScreen from '../Courier/CourierActiveDeliveryScreen';
import CourierHistoryScreen from '../Courier/CourierHistoryScreen'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SettingsScreenStack = ({navigation}) => (
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

const CourierScreenStack = ({navigation}) => (
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
            <Stack.Screen name="BecomeACourier" component={BecomeACourierScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: 'Osobné doklady'
            }} />
            <Stack.Screen name="BecomeACourierMoreInfo" component={BecomeACourierMoreInfoScreen} options={{
                title: 'Trvalý pobyt'
            }}/>
            <Stack.Screen name="CourierMainScreen" component={CourierMainScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
            <Stack.Screen name="CourierHistoryScreen" component={CourierHistoryScreen} options={{
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={25} backgroundColor="#fff" color="#000" onPress={() => navigation.openDrawer()}></Icon.Button>
                ),
                title: ''
            }} />
            <Stack.Screen name="CourierDeliveryScreen" component={CourierDeliveryScreen} options={{
                title: 'Detail zásielky'
            }}/>
            <Stack.Screen name="CourierPickupDeliveryScreen" component={CourierPickupDeliveryScreen} options={{
                title: 'Vyzdvihnutie zásielky'
            }}/>
            <Stack.Screen name="CourierActiveDeliveryScreen" component={CourierActiveDeliveryScreen} options={{
                title: 'Aktívna zásielka'
            }}/>
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
            <Drawer.Screen name="SettingsScreenStack" component={SettingsScreenStack} 
                options={{
                    title: 'Nastavenia',
                    headerShown: false,
                }}/>
            <Drawer.Screen name="CourierScreenStack" component={CourierScreenStack} 
                options={{
                    title: 'Courier',
                    headerShown: false,
                }}/>
            
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;