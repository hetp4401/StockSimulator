import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const RootStack = createStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import InApp from "./screens/inApp/InApp";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen name="inApp" component={InApp} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
