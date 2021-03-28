import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { auth } from "../lib/firebase";

const Account = ({ navigation }) => {
  const logOut = () => {
    auth()
      .signOut()
      .then((res) => {
        navigation.navigate("Login", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View>
          <TouchableOpacity style={styles.logOutBtn} onPress={logOut}>
            <Text style={{ fontSize: 22, alignSelf: "center" }}>Log Out</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, alignSelf: "center" }}>
            More coming soon...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logOutBtn: {
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#edeef2",
    alignItems: "center",
  },
});
export default Account;
