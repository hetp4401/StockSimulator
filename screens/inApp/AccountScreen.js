import React from "react";
import Stock from "../../Components/Stock";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../Components/Account";

const accountStack = createStackNavigator();

const AccountScreen = () => {
  return (
    <accountStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <accountStack.Screen
        name="Account"
        component={Account}
        options={{
          headerStyle: {
            backgroundColor: "#3045b0",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <accountStack.Screen
        name="stock"
        component={Stock}
        options={{
          headerStyle: {
            backgroundColor: "#3045b0",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </accountStack.Navigator>
  );
};

export default AccountScreen;
