import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth, db } from "../lib/firebase";

const LoginScreen = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signup = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return db.collection("users").doc(res.user.uid).set({
          balance: 10000,
          watchlist: [],
          history: [],
        });
      })
      .then(() => {
        props.navigation.navigate("inApp", {});
        console.log(res);
      })
      .catch((err) => Alert.alert(JSON.stringify(err)));
  };

  return (
    <View style={styles.continaer}>
      <View style={styles.circle} />
      <View style={{ marginHorizontal: 32, marginTop: 100 }}>
        <Text style={styles.header}>SignUp</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setemail(text)}
          value={email}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setpassword(text)}
          secureTextEntry={true}
          value={password}
        ></TextInput>
        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
          <TouchableOpacity style={styles.screen} onPress={signup}>
            <Ionicons name="md-arrow-round-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  continaer: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: "#fff",
    position: "absolute",
    left: -120,
    top: 50,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    fontStyle: "normal",
    color: "#514e5a",
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    borderRadius: 30,
    color: "#514e5a",
    fontWeight: "600",
  },
  screen: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0B132B",
    alignItems: "center",
    justifyContent: "center",
  },
  signup: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
