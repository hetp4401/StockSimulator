import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Search = ({ navigation }) => {
  const [stocks, setstocks] = useState([]);

  const results = (search) => {
    if (search.length > 0) {
      fetch("https://stocksimulator.billybishop1.repl.co/api/search/" + search)
        .then((res) => res.json())
        .then((data) => {
          setstocks(data);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TextInput
        style={styles.input}
        placeholder="search stock"
        onChangeText={(search) => {
          results(search);
        }}
      ></TextInput>
      <ScrollView>
        {stocks.map((x, i) => (
          <TouchableOpacity
            style={styles.result}
            key={i}
            onPress={() => navigation.navigate("stock", { x })}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Arial",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {x.ticker}
              </Text>
              <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
                {x.name}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Arial",
                fontSize: 20,
                fontWeight: "normal",
                textAlignVertical: "center",
              }}
            >
              {x.exchange}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 52,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    borderRadius: 30,
    color: "#514e5a",
    fontWeight: "600",
  },
  list: {
    marginTop: 20,
    marginLeft: 20,
  },
  result: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#edeef2",
  },
});

export default Search;
