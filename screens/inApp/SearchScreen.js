import React from "react";

import Search from "../../Components/Search";
import Stock from "../../Components/Stock";
import { HeaderBackButton } from "@react-navigation/stack";

import { createStackNavigator } from "@react-navigation/stack";
const searchStack = createStackNavigator();

const SearchScreen = () => {
  return (
    <searchStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <searchStack.Screen
        name="Search"
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: "#0B132B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBackTitle: "Log Out",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                console.log("SUCCS");
              }}
            />
          ),
        }}
      />
      <searchStack.Screen
        name="stock"
        component={Stock}
        options={{
          headerStyle: {
            backgroundColor: "#0B132B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </searchStack.Navigator>
  );
};

export default SearchScreen;
