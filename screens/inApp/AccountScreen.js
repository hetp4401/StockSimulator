import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { auth } from "../../firebase";

const AccountScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Account pr nkgnnrgkj rtkn gkrntg krtgkj rktng r nkjrgage</Text>
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

export default AccountScreen;
