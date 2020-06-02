import React from "react";

import SearchScreen from "./SearchScreen";
import Stock from "../../Components/Stock";

import { createStackNavigator } from "@react-navigation/stack";
const searchStack = createStackNavigator();

const SearchStack = () => {
  return (
    <searchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <searchStack.Screen name="search" component={SearchScreen} />
      <searchStack.Screen name="stock" component={Stock} />
    </searchStack.Navigator>
  );
};

export default SearchStack;
