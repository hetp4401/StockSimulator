import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { auth } from "../lib/firebase";

const LogOut = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then((res) => {
              navigation.navigate("Login", {});
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        style={{
          marginTop: 30,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            color: "red",
            marginLeft: 20,
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;
