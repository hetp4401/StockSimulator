import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { auth } from "../firebase";

const LoginScreen = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (auth().currentUser) {
        props.navigation.navigate("inApp", {});
      }
    }, 1500);
  }, []);

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setemail("");
        setpassword("");
        props.navigation.navigate("inApp", {});
      })
      .catch((err) => Alert.alert("Invalid credentials"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginTop: 150 }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        ></Image>
      </View>
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Login</Text>
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
          value={password}
        ></TextInput>
        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
          <TouchableOpacity style={styles.screen} onPress={login}>
            <Ionicons name="md-arrow-round-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signup}
            onPress={() => props.navigation.navigate("Register", {})}
          >
            <Text>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#9075E3",
    alignItems: "center",
    justifyContent: "center",
  },
  signup: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
