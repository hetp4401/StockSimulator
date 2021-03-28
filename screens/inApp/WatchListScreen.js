import React from "react";
import WatchList from "../../Components/WatchList";
import Stock from "../../Components/Stock";
import { HeaderBackButton } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
const watchListStack = createStackNavigator();

const WatchListScreen = () => {
  return (
    <watchListStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <watchListStack.Screen
        name="Watchlist"
        component={WatchList}
        options={{
          headerStyle: {
            backgroundColor: "#3045b0",
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
      <watchListStack.Screen
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
    </watchListStack.Navigator>
  );
};

export default WatchListScreen;
