import React from "react";

import AccountScreen from "./AccountScreen";
import SearchScreen from "./SearchScreen";
import FeedScreen from "./FeedScreen";
import WatchListScreen from "./WatchListScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();


const InApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Account') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search';
          } else if (route.name === 'Feed') {
            iconName = focused ? 'ios-paper' : 'ios-paper';
          } else if (route.name === 'WatchList') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="WatchList" component={WatchListScreen} />
    </Tab.Navigator>
  );
};

export default InApp;
