import React from "react";

import SearchScreen from "./SearchScreen";
import FeedScreen from "./FeedScreen";
import WatchListScreen from "./WatchListScreen";
import AccountScreen from "./AccountScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const InApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search";
          } else if (route.name === "Feed") {
            iconName = focused ? "ios-paper" : "ios-paper";
          } else if (route.name === "WatchList") {
            iconName = focused ? "ios-star" : "ios-star-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "ios-settings" : "ios-settings";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#0B132B",
        inactiveTintColor: "gray",
      }}
      backBehavior="none"
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="WatchList" component={WatchListScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default InApp;
