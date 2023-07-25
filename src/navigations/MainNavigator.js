import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"; // Corrected import
import TabNavigator from './TabNavigator';
import { StatusBar } from 'expo-status-bar';
import { TabContextProvider } from '../context/TabContext';
import UserScreen from '../screens/UserScreen';
import LoginScreen from '../screens/LoginScreen';
import SingUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <TabContextProvider>
            <NavigationContainer>
                <StatusBar hidden></StatusBar>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Root" 
                        component={TabNavigator} 
                        options={{
                            headerShown: false,
                        }}>
                    </Stack.Screen>
                    <Stack.Screen name="UserScreen" component={UserScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SingUp" component={SingUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </TabContextProvider>
    );
};

export default MainNavigator;