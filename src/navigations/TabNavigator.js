import React from "react";
import {Image, StyleSheet, View, Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import UserScreen from "../screens/UserScreen";
import AddButton from "../components/AddButton";
import { colors } from "../constants/theme";
import {useTabMenu} from "../context/TabContext";

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';  

const Tab = createBottomTabNavigator();

// const getIconColor = focused => ({
//   tintColor: focused ? colors.primary : colors.dark,
// });

const TabsNavigator = () => {
  const {opened, toggleOpened} = useTabMenu();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Feather name="home" size={24} color="black" style={styles.tabIcon}/>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Feather name="search" size={24} color="black" style={styles.tabIcon}/>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: () => (
            <AddButton opened={opened} toggleOpened={toggleOpened} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <MaterialIcons name="favorite-outline" size={26} color="black" style={styles.tabIcon}/>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Feather name="user" size={24} color="black" style={styles.tabIcon}/>
            </View>
          ),
        }}
        listeners={{
          tabPress: e => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    padding: 0,
    height: 52,
    backgroundColor: "#ffffff",
    borderTopColor: "transparent",
    shadowColor: colors.dark,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIconContainer: {
    position: "absolute",
    top: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabsNavigator;