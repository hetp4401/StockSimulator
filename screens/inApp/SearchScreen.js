import React from "react";

import Search from "../../Components/Search";
import Stock from "../../Components/Stock";

import { createStackNavigator } from "@react-navigation/stack";
const searchStack = createStackNavigator();

const SearchScreen = () => {
  return (
    <searchStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <searchStack.Screen name="search" component={Search} />
      <searchStack.Screen name="stock" component={Stock} />
    </searchStack.Navigator>
  );
};

export default SearchScreen;
