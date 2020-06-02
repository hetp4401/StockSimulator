import React from "react";

import AccountScreen from "./AccountScreen";
import SearchStack from "./SearchStack";
import FeedScreen from "./FeedScreen";
import WatchListScreen from "./WatchListScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const InApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="WatchList" component={WatchListScreen} />
    </Tab.Navigator>
  );
};

export default InApp;
