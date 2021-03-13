import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const RootStack = createStackNavigator();

import LoginScreen from "./screens/LoginScreen";
import InApp from "./screens/inApp/InApp";
import RegisterScreen from "./screens/RegisterScreen";

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        navigationOptions={{
          title: "MyScreen",
          headerLeft: null,
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
