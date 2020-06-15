import React from "react";
import Feed from "../../Components/Feed";
import Stock from "../../Components/Stock";

import { createStackNavigator } from "@react-navigation/stack";

const feedStack = createStackNavigator();

const FeedScreen = () => {
  return (
    <feedStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <feedStack.Screen name="feed" component={Feed} />
      <feedStack.Screen name="stock" component={Stock} />
    </feedStack.Navigator>
  );
};

export default FeedScreen;
