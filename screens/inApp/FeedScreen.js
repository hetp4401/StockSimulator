import React from "react";
import Feed from "../../Components/Feed";
import Stock from "../../Components/Stock";
import { HeaderBackButton } from "@react-navigation/stack";
import { auth } from "../../firebase";
import { createStackNavigator } from "@react-navigation/stack";

const feedStack = createStackNavigator();

const FeedScreen = (props) => {
  return (
    <feedStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <feedStack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerStyle: {
            backgroundColor: "#0B132B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // headerLeft: (props) => (
          //   <HeaderBackButton
          //     onPress={() => {
          //       auth()
          //         .signOut()
          //         .then((res) => {

          //         })
          //         .catch((err) => {
          //           console.log(err);
          //         });
          //     }}
          //   />
          // ),
        }}
      />
      <feedStack.Screen
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
    </feedStack.Navigator>
  );
};

export default FeedScreen;
