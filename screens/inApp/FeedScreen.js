import React from "react";
import Feed from "../../Components/Feed";
import Stock from "../../Components/Stock";
import { HeaderBackButton } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";

const feedStack = createStackNavigator();

const FeedScreen = () => {
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
                // auth()
                //   .signOut()
                //   .then((res) => {
                //     console.log("SUCCSESS");
                //   })
                //   .catch((err) => {
                //     console.log(err);
                //   });
                console.log("SUCCS");
              }}
            />
          ),
        }}
      />
      <feedStack.Screen
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
    </feedStack.Navigator>
  );
};

export default FeedScreen;
